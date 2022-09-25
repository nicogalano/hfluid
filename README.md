React application that allows to determine the hydraulic characteristics of channels

## Selección de tubería de hdpe

## Selector de diámetro

### input: 
- PE 100 fijo
- PN
- Diámetro (in o mm)

### Output:
- Espesor mín (mm)
- Diámetro interior (mm)
- Área interna (mm?) 
- Peso (kg/m) ¿?

## Para la altura crítica y otras variables
### Output
- Caudal (m3/h)
- Pendiente (m/m)
- Forma (Sección de la conducción) -> como mvp puede ser sólo tubería circular
  - Ancho Basal / Diámetro (m)
  - Talud derecho (H:V)
  - Talud  izquierdo  (H:V)
- Rugosidad de Manning (n) -> Selector según material o personalizado
### Input:
- Condición en régimen
  - Altura normal (m) -> HNORMAL()
  - Área hidráulica (m2) -> AREAMOJADA()
  - Radio hidráulico (m) -> RADIOHIDRÁULICO()
  - Velocidad media (m/s) -> Caudal / Altura normal 
  - Froude -> NFROUDE
  - Energía Específica (m) ->  Altura normal +  (Velocidad media)^2 / g 
- Criterios
  - 0,6  Diámetro   >=  Altura crítica >=  0,3 Diámetro 
  - Froude > 1.2 o  Froude  <  0.8