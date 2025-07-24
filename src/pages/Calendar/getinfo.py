import pandas as pd
import json
import tkinter as tk
from tkinter import filedialog
import os

def convertir_excel_a_json_final(ruta_excel, ruta_json):
    """
    Convierte un archivo Excel a JSON, excluyendo un conjunto específico de
    columnas para generar un resultado limpio y enfocado.
    """
    try:
        # Lee todas las celdas como texto para máxima compatibilidad.
        df = pd.read_excel(ruta_excel, engine='openpyxl', dtype=str)
        df.replace('nan', '', inplace=True)

        # Claves "limpias" para el JSON. El orden coincide con las columnas del Excel.
        columnas_limpias = [
            'tipo_curso', 'titulo', 'modalidad', 'mes', 'dia', 'horario_inicio',
            'horario_fin', 'region', 'lugar', 'banners_hpp', 'sucursal_syscom',
            'organizador', 'direccion_formacion', 'link_registro', 'link_syscom',
            'link_zoom', 'numero_cliente'
        ]
        
        # --- CAMBIO CLAVE: Lista de campos a ignorar ---
        campos_a_excluir = [
            'tipo_curso', 'banners_hpp', 'link_syscom',
            'link_zoom', 'numero_cliente'
        ]

        cursos_json = []
        for index, row in df.iterrows():
            # Omite la fila si no tiene un título válido.
            if not str(row.get('Título', '')).strip():
                continue

            curso = {"id": f"{index + 1}"}

            # 1. Captura todos los datos de la fila.
            for i, col_original in enumerate(df.columns):
                clave_json = columnas_limpias[i] if i < len(columnas_limpias) else col_original.strip().replace(' ', '_').lower()
                valor_celda = str(row[col_original]).strip()
                
                # --- LÓGICA DE EXCLUSIÓN ---
                # Solo añade el campo al diccionario si NO está en la lista de exclusión.
                if clave_json not in campos_a_excluir:
                    curso[clave_json] = valor_celda
            
            # Limpieza adicional para el link de registro si es un guión.
            if curso.get('link_registro') == '-':
                del curso['link_registro']

            cursos_json.append(curso)

        if not cursos_json:
            print("⚠️ Advertencia: No se encontraron filas con un 'Título' válido. No se generó el archivo.")
            return False

        with open(ruta_json, 'w', encoding='utf-8') as f:
            json.dump(cursos_json, f, indent=4, ensure_ascii=False)
        return True

    except Exception as e:
        print(f"❌ Ocurrió un error inesperado al procesar el archivo: {e}")
        return False

def seleccionar_archivo_excel():
    root = tk.Tk()
    root.withdraw()
    return filedialog.askopenfilename(
        title="Selecciona tu archivo de Excel (.xlsx)",
        filetypes=[("Archivos de Excel", "*.xlsx"), ("Todos los archivos", "*.*")]
    )

if __name__ == "__main__":
    ruta_entrada_excel = seleccionar_archivo_excel()
    if ruta_entrada_excel:
        directorio_script = os.path.dirname(os.path.realpath(__file__))
        nombre_base = os.path.basename(ruta_entrada_excel).split('.')[0]
        ruta_salida_json = os.path.join(directorio_script, f"{nombre_base}_final.json")
        
        exito = convertir_excel_a_json_final(ruta_entrada_excel, ruta_salida_json)
        
        if exito:
            print("\n" + "="*50)
            print("✅ ¡Éxito! El archivo JSON final se ha creado.")
            print(f"\nUbicación (misma carpeta que tu script):")
            print(f"➡️   {ruta_salida_json}")
            print("="*50 + "\n")
            print(f"El archivo se llama: {os.path.basename(ruta_salida_json)}")
    else:
        print("Operación cancelada. No se seleccionó ningún archivo.")
    
    input("--- Presiona Enter para salir ---")