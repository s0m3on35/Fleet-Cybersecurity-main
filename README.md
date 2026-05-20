# Ciberseguridad en Sistemas de Gestion de Flotas

Repositorio educativo con una visualizacion interactiva del curso de ciberseguridad en flotas de vehiculos.

El objetivo es reunir en una sola herramienta navegable los conceptos principales del SGF: arquitectura, telemetria, comunicaciones, cloud, APIs, GNSS spoofing, Steer-by-Wire, PKI, OTA y puntos unicos de fallo.

## Contenido

- Cobertura del dia 1: contexto UNECE/R155, ecosistema de vehiculo conectado, tecnologias emergentes, telemetria, datos enviados, receptores, transmision y vulnerabilidades iniciales de un SGF.
- Cobertura del dia 2: arquitectura distribuida SGF, cloud, APIs, GNSS, datos y RGPD, IA/ML, plataformas de mercado, modelos de despliegue, tercerizacion, seguridad multicapa, evaluacion de proveedores, evidencias, OTA y respuesta a incidentes.
- Cobertura del dia 3: incidente de telemetria en 25 vehiculos, ubicaciones falsas, combustible irreal, rutas no realizadas, hipotesis de ataque, evidencias forenses, criterios de descarte, respuesta inicial y anexo avanzado.
- Mapa conceptual del ecosistema SGF
- Seis elementos tecnologicos principales
- Dependencias criticas de una flota conectada
- Riesgos de sensores, GNSS y telemetria
- Deteccion de GPS spoofing con DBSCAN adaptativo
- Steer-by-Wire y manipulacion de sensores
- Seguridad cloud, IAM, mTLS, certificados y logging
- Single Point of Failure en plataformas SGF
- Ataques avanzados por capas: RF/PNT, TCU, CAN, MQTT, API, SDV, OTA, EMI/HPM y laboratorio defensivo
- Documento final integrado descargable desde GitHub Pages
- TXT descargable con tecnicas defensivas y de ataque en automocion, SDV, V2X y vehiculos autonomos
- Software libre y recursos visuales utiles

## Estructura

```text
docs/
  assets/
    Evaluacion_practica_SGF_dia_3_20052026_FINAL_integrado.docx
    Tecnicas_defensivas_y_ataque_automotriz_ultra_premium.txt
  index.html
  style.css
  main.js
  README.md
```

## Uso

No requiere instalacion ni dependencias.

1. Abrir `docs/index.html` en un navegador.
2. Usar la navegacion lateral o el buscador para filtrar conceptos.

Tambien se puede publicar la carpeta `docs/` con GitHub Pages.

## Enfoque

La idea central es que una flota conectada ya no es solo un sistema GPS. Es una infraestructura IoT ciberfisica distribuida, donde vehiculos, sensores, TCUs, comunicaciones, cloud, APIs, identidades digitales y personas forman una cadena de confianza.

Si se compromete una pieza critica, el impacto puede pasar de afectar a un vehiculo a afectar a toda la flota.
