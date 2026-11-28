"""
Mapa de Monterrey, N.L., México, en escala de grises (versión de baja resolución).

Mismas dimensiones físicas que mapa_monterrey.py (30 x 30 pulgadas, radio de 12 km),
pero con un DPI mucho menor: 30 in * 100 dpi = 3,000 x 3,000 px (~9 MP).
Es rápido de generar y consume poca memoria.

Instalación:
    pip install osmnx geopandas matplotlib pillow

Uso:
    python mapa_monterrey_baja_res.py
"""

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import osmnx as ox
import geopandas as gpd
from PIL import Image

Image.MAX_IMAGE_PIXELS = None

# ----------------- PARÁMETROS -----------------
CENTRO = (25.6866, -100.3161)   # Macroplaza, centro de Monterrey
RADIO_M = 12000                 # mismo radio que la versión de alta resolución
ANCHO_PULG = 30                 # mismas dimensiones: 30 x 30 pulgadas
DPI = 100                       # resolución baja (la de alta usa 300)
INCLUIR_EDIFICIOS = True
SALIDA = "monterrey_gris_baja_res.png"
# -----------------------------------------------

ox.settings.use_cache = True
ox.settings.timeout = 600

# Tonos de gris (0 = negro, 1 = blanco)
FONDO = "#f2f2f2"
AGUA = "#c8c8c8"
PARQUES = "#dedede"
EDIFICIOS = "#b0b0b0"

ANCHO_CALLE = {
    "motorway": 3.2, "motorway_link": 2.0,
    "trunk": 2.8, "trunk_link": 1.8,
    "primary": 2.2, "primary_link": 1.5,
    "secondary": 1.6, "secondary_link": 1.2,
    "tertiary": 1.2, "tertiary_link": 1.0,
    "residential": 0.7, "unclassified": 0.7,
    "living_street": 0.5, "service": 0.35,
}
COLOR_CALLE = {
    "motorway": "#000000", "trunk": "#111111", "primary": "#222222",
    "secondary": "#333333", "tertiary": "#444444",
}


def tipo(h):
    return h[0] if isinstance(h, list) else h


def main():
    print("Descargando calles...")
    G = ox.graph_from_point(CENTRO, dist=RADIO_M, network_type="drive_service",
                            simplify=True, retain_all=True)
    calles = ox.graph_to_gdfs(G, nodes=False)
    calles["tipo"] = calles["highway"].apply(tipo)
    calles = calles[calles["tipo"].isin(ANCHO_CALLE)]

    print("Descargando agua y parques...")
    tags_agua = {"natural": "water", "waterway": ["river", "canal", "riverbank"],
                 "water": True}
    tags_verde = {"leisure": ["park", "garden", "pitch"],
                  "landuse": ["grass", "forest", "recreation_ground"],
                  "natural": ["wood", "scrub"]}
    try:
        agua = ox.features_from_point(CENTRO, tags_agua, dist=RADIO_M)
    except Exception:
        agua = gpd.GeoDataFrame(geometry=[], crs="EPSG:4326")
    try:
        verde = ox.features_from_point(CENTRO, tags_verde, dist=RADIO_M)
    except Exception:
        verde = gpd.GeoDataFrame(geometry=[], crs="EPSG:4326")

    edificios = gpd.GeoDataFrame(geometry=[], crs="EPSG:4326")
    if INCLUIR_EDIFICIOS:
        print("Descargando edificios (puede tardar varios minutos)...")
        try:
            edificios = ox.features_from_point(CENTRO, {"building": True}, dist=RADIO_M)
        except Exception as e:
            print("No se pudieron descargar edificios:", e)

    # Proyectar a UTM (metros) para que el mapa no se deforme
    crs = calles.estimate_utm_crs()
    calles = calles.to_crs(crs)
    agua = agua.to_crs(crs) if len(agua) else agua
    verde = verde.to_crs(crs) if len(verde) else verde
    edificios = edificios.to_crs(crs) if len(edificios) else edificios

    print("Renderizando...")
    fig, ax = plt.subplots(figsize=(ANCHO_PULG, ANCHO_PULG), dpi=DPI)
    fig.patch.set_facecolor(FONDO)
    ax.set_facecolor(FONDO)

    if len(verde):
        v = verde[verde.geometry.type.isin(["Polygon", "MultiPolygon"])]
        v.plot(ax=ax, color=PARQUES, linewidth=0)
    if len(agua):
        a = agua[agua.geometry.type.isin(["Polygon", "MultiPolygon"])]
        a.plot(ax=ax, color=AGUA, linewidth=0)
        l = agua[agua.geometry.type.isin(["LineString", "MultiLineString"])]
        if len(l):
            l.plot(ax=ax, color=AGUA, linewidth=2.0)
    if len(edificios):
        b = edificios[edificios.geometry.type.isin(["Polygon", "MultiPolygon"])]
        b.plot(ax=ax, color=EDIFICIOS, linewidth=0)

    # Calles de menor a mayor jerarquía para que las grandes queden encima
    orden = list(ANCHO_CALLE.keys())[::-1]
    for t in orden:
        sub = calles[calles["tipo"] == t]
        if len(sub):
            base = t.replace("_link", "")
            sub.plot(ax=ax, color=COLOR_CALLE.get(base, "#555555"),
                     linewidth=ANCHO_CALLE[t] * ANCHO_PULG / 30, zorder=3)

    # Encuadre cuadrado centrado en CENTRO
    cx, cy = (gpd.GeoSeries(gpd.points_from_xy([CENTRO[1]], [CENTRO[0]]), crs="EPSG:4326")
              .to_crs(crs).iloc[0].coords[0])
    ax.set_xlim(cx - RADIO_M, cx + RADIO_M)
    ax.set_ylim(cy - RADIO_M, cy + RADIO_M)
    ax.set_aspect("equal")
    ax.axis("off")
    fig.subplots_adjust(0, 0, 1, 1)

    tmp = "_tmp_color_baja.png"
    fig.savefig(tmp, dpi=DPI, facecolor=FONDO)
    plt.close(fig)

    print("Convirtiendo a escala de grises...")
    Image.open(tmp).convert("L").save(SALIDA, optimize=True, dpi=(DPI, DPI))
    print(f"Listo: {SALIDA}")


if __name__ == "__main__":
    main()
