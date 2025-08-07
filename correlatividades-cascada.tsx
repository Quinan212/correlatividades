"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Search, ZoomIn, ZoomOut, RotateCcw, Download, Filter, ChevronRight, Info, X } from 'lucide-react'
import type { JSX } from "react"

// Definición de tipos
type Materia = {
  id: string
  codigo: string
  nombre: string
  año: number
  tipo: string
  formato: string
  correlativas: string[]
  horas: string
}

// Datos de materias con correlatividades corregidas
const materias: Materia[] = [
  // PRIMER AÑO - Sin correlativas
  {
    id: "pedagogia",
    codigo: "PED",
    nombre: "Pedagogía",
    año: 1,
    tipo: "Formación General",
    formato: "Asignatura",
    correlativas: [],
    horas: "4 hs",
  },
  {
    id: "problematica-conocimiento",
    codigo: "PCH",
    nombre: "Problemática del Conocimiento Histórico",
    año: 1,
    tipo: "Formación Específica",
    formato: "Asignatura",
    correlativas: [],
    horas: "4 hs",
  },
  {
    id: "procesos-antiguedad",
    codigo: "ANT",
    nombre: "Procesos Sociales, Políticos, Económicos y Culturales de la Antigüedad",
    año: 1,
    tipo: "Formación Específica",
    formato: "Asignatura",
    correlativas: [],
    horas: "5 hs",
  },
  {
    id: "historia-ideas-1",
    codigo: "HI1",
    nombre: "Historia de las Ideas I",
    año: 1,
    tipo: "Formación Específica",
    formato: "Seminario",
    correlativas: [],
    horas: "3 hs",
  },
  {
    id: "pueblos-originarios",
    codigo: "POA",
    nombre: "Procesos Sociales, Políticos, Económicos y Culturales de los Pueblos Originarios de América",
    año: 1,
    tipo: "Formación Específica",
    formato: "Asignatura",
    correlativas: [],
    horas: "4 hs",
  },
  {
    id: "oralidad-lectura",
    codigo: "OLT",
    nombre: "Oralidad, Lectura, Escritura y TIC",
    año: 1,
    tipo: "Formación General",
    formato: "Taller",
    correlativas: [],
    horas: "3 hs",
  },
  {
    id: "corporeidad-juego",
    codigo: "CJA",
    nombre: "Corporeidad, Juego y Lenguajes Artísticos",
    año: 1,
    tipo: "Formación General",
    formato: "Taller",
    correlativas: [],
    horas: "3 hs",
  },
  {
    id: "practica-1",
    codigo: "PD1",
    nombre: "Práctica Docente I - Sujetos y Contextos",
    año: 1,
    tipo: "Práctica Profesional",
    formato: "Seminario-Taller",
    correlativas: [],
    horas: "4 hs",
  },
  {
    id: "didactica-general",
    codigo: "DG",
    nombre: "Didáctica General",
    año: 1,
    tipo: "Formación General",
    formato: "Asignatura",
    correlativas: [],
    horas: "4 hs",
  },

  // SEGUNDO AÑO
  {
    id: "filosofia",
    codigo: "FIL",
    nombre: "Filosofía",
    año: 2,
    tipo: "Formación General",
    formato: "Asignatura",
    correlativas: ["pedagogia"],
    horas: "3 hs",
  },
  {
    id: "psicologia-educacional",
    codigo: "PE",
    nombre: "Psicología Educacional",
    año: 2,
    tipo: "Formación General",
    formato: "Asignatura",
    correlativas: ["pedagogia"],
    horas: "4 hs",
  },
  {
    id: "educacion-sexual",
    codigo: "ESI",
    nombre: "Educación Sexual Integral",
    año: 2,
    tipo: "Formación General",
    formato: "Taller",
    correlativas: ["corporeidad-juego"],
    horas: "2 hs",
  },
  {
    id: "procesos-feudalismo-modernidad",
    codigo: "FM",
    nombre: "Procesos Sociales, Políticos, Económicos y Culturales del Feudalismo y la Modernidad",
    año: 2,
    tipo: "Formación Específica",
    formato: "Asignatura",
    correlativas: ["procesos-antiguedad", "historia-ideas-1", "pueblos-originarios", "problematica-conocimiento"],
    horas: "4 hs",
  },
  {
    id: "procesos-americanos-1",
    codigo: "AM1",
    nombre: "Procesos Sociales, Políticos, Económicos y Culturales Americanos I",
    año: 2,
    tipo: "Formación Específica",
    formato: "Asignatura",
    correlativas: ["pueblos-originarios"],
    horas: "3 hs",
  },
  {
    id: "historia-ideas-2",
    codigo: "HI2",
    nombre: "Historia de las Ideas II",
    año: 2,
    tipo: "Formación Específica",
    formato: "Seminario",
    correlativas: ["historia-ideas-1", "problematica-conocimiento"],
    horas: "3 hs",
  },
  {
    id: "mundo-territorialidades",
    codigo: "MT",
    nombre: "El Mundo y las Nuevas Territorialidades",
    año: 2,
    tipo: "Formación Específica",
    formato: "Asignatura",
    correlativas: ["historia-ideas-1", "pueblos-originarios", "procesos-antiguedad"],
    horas: "3 hs",
  },
  {
    id: "economia-politica",
    codigo: "EP",
    nombre: "Economía Política",
    año: 2,
    tipo: "Formación Específica",
    formato: "Seminario",
    correlativas: ["procesos-antiguedad", "historia-ideas-1", "didactica-general", "problematica-conocimiento"],
    horas: "3 hs",
  },
  {
    id: "didactica-ciencias-sociales",
    codigo: "DCS",
    nombre: "Didáctica de las Ciencias Sociales",
    año: 2,
    tipo: "Formación Específica",
    formato: "Seminario",
    correlativas: ["didactica-general", "problematica-conocimiento", "procesos-antiguedad", "historia-ideas-1"],
    horas: "3 hs",
  },
  {
    id: "sujetos-educacion",
    codigo: "SE",
    nombre: "Sujetos de la Educación Secundaria",
    año: 2,
    tipo: "Formación General",
    formato: "Seminario",
    correlativas: ["didactica-general", "pedagogia"],
    horas: "3 hs",
  },
  {
    id: "practica-2",
    codigo: "PD2",
    nombre: "Práctica Docente II - Educación Secundaria y Práctica Docente",
    año: 2,
    tipo: "Práctica Profesional",
    formato: "Seminario-Taller",
    correlativas: ["practica-1", "pedagogia", "didactica-general"],
    horas: "4 hs",
  },

  // TERCER AÑO
  {
    id: "historia-politica-educacion",
    codigo: "HPE",
    nombre: "Historia y Política de la Educación Argentina",
    año: 3,
    tipo: "Formación General",
    formato: "Asignatura",
    correlativas: ["pedagogia"],
    horas: "3 hs",
  },
  {
    id: "sociologia-educacion",
    codigo: "SOE",
    nombre: "Sociología de la Educación",
    año: 3,
    tipo: "Formación General",
    formato: "Asignatura",
    correlativas: [],
    horas: "3 hs",
  },
  {
    id: "instituciones-educativas",
    codigo: "IE",
    nombre: "Análisis y Organización de las Instituciones Educativas",
    año: 3,
    tipo: "Formación General",
    formato: "Asignatura",
    correlativas: ["sujetos-educacion", "practica-1", "practica-2"],
    horas: "3 hs",
  },
  {
    id: "procesos-contemporaneos-1",
    codigo: "C1",
    nombre: "Procesos Sociales, Políticos, Económicos y Culturales Contemporáneos I",
    año: 3,
    tipo: "Formación Específica",
    formato: "Asignatura",
    correlativas: [
      "procesos-feudalismo-modernidad",
      "didactica-ciencias-sociales",
      "procesos-americanos-1",
      "historia-ideas-2",
      "economia-politica",
    ],
    horas: "3 hs",
  },
  {
    id: "procesos-americanos-2",
    codigo: "AM2",
    nombre: "Procesos Sociales, Políticos, Económicos y Culturales Americanos II",
    año: 3,
    tipo: "Formación Específica",
    formato: "Asignatura",
    correlativas: ["procesos-americanos-1", "mundo-territorialidades"],
    horas: "3 hs",
  },
  {
    id: "procesos-argentina-1",
    codigo: "AR1",
    nombre: "Procesos Sociales, Políticos, Económicos y Culturales de Argentina I",
    año: 3,
    tipo: "Formación Específica",
    formato: "Asignatura",
    correlativas: ["procesos-americanos-1", "mundo-territorialidades"],
    horas: "4 hs",
  },
  {
    id: "epistemologia-historia",
    codigo: "EH",
    nombre: "Epistemología de la Historia",
    año: 3,
    tipo: "Formación Específica",
    formato: "Seminario",
    correlativas: ["filosofia", "problematica-conocimiento", "historia-ideas-2"],
    horas: "3 hs",
  },
  {
    id: "didactica-historia",
    codigo: "DH",
    nombre: "Didáctica de la Historia",
    año: 3,
    tipo: "Formación Específica",
    formato: "Seminario",
    correlativas: ["didactica-ciencias-sociales", "sujetos-educacion"],
    horas: "3 hs",
  },
  {
    id: "udi-1",
    codigo: "UDI1",
    nombre: "UDI I",
    año: 3,
    tipo: "Formación Específica",
    formato: "Variable",
    correlativas: [],
    horas: "3 hs",
  },
  {
    id: "practica-3",
    codigo: "PD3",
    nombre: "Práctica Docente III - Cotidianeidad en las Aulas",
    año: 3,
    tipo: "Práctica Profesional",
    formato: "Seminario-Taller",
    correlativas: [
      "practica-2",
      "psicologia-educacional",
      "sujetos-educacion",
      "procesos-feudalismo-modernidad",
      "didactica-ciencias-sociales",
      "procesos-americanos-1",
      "historia-ideas-2",
      "mundo-territorialidades",
      "economia-politica",
    ],
    horas: "6 hs",
  },

  // CUARTO AÑO
  {
    id: "derechos-humanos",
    codigo: "DHU",
    nombre: "Derechos Humanos: Ética y Ciudadanía",
    año: 4,
    tipo: "Formación General",
    formato: "Asignatura",
    correlativas: ["filosofia"],
    horas: "3 hs",
  },
  {
    id: "procesos-contemporaneos-2",
    codigo: "C2",
    nombre: "Procesos Sociales, Políticos, Económicos y Culturales Contemporáneos II",
    año: 4,
    tipo: "Formación Específica",
    formato: "Asignatura",
    correlativas: ["procesos-contemporaneos-1", "didactica-historia", "procesos-americanos-2", "procesos-argentina-1"],
    horas: "3 hs",
  },
  {
    id: "procesos-americanos-3",
    codigo: "AM3",
    nombre: "Procesos Sociales, Políticos, Económicos y Culturales Americanos III",
    año: 4,
    tipo: "Formación Específica",
    formato: "Asignatura",
    correlativas: ["procesos-contemporaneos-1", "procesos-americanos-2", "procesos-argentina-1"],
    horas: "4 hs",
  },
  {
    id: "procesos-argentina-2",
    codigo: "AR2",
    nombre: "Procesos Sociales, Políticos, Económicos y Culturales de Argentina II",
    año: 4,
    tipo: "Formación Específica",
    formato: "Seminario-Taller",
    correlativas: ["procesos-americanos-2", "procesos-argentina-1", "procesos-contemporaneos-1"],
    horas: "4 hs",
  },
  {
    id: "problematicas-regionales",
    codigo: "PR",
    nombre: "Problemáticas Históricas Regionales y Locales",
    año: 4,
    tipo: "Formación Específica",
    formato: "Taller",
    correlativas: ["didactica-historia", "procesos-americanos-2", "procesos-argentina-1", "epistemologia-historia"],
    horas: "4 hs",
  },
  {
    id: "udi-2",
    codigo: "UDI2",
    nombre: "UDI II",
    año: 4,
    tipo: "Formación Específica",
    formato: "Variable",
    correlativas: [],
    horas: "3 hs",
  },
  {
    id: "practica-4",
    codigo: "RES",
    nombre: "Práctica Docente IV - Residencia",
    año: 4,
    tipo: "Práctica Profesional",
    formato: "Seminario-Taller",
    correlativas: [
      "sujetos-educacion",
      "practica-3",
      "instituciones-educativas",
      "procesos-contemporaneos-1",
      "didactica-historia",
      "procesos-americanos-2",
      "procesos-argentina-1",
      "epistemologia-historia",
      "udi-1",
    ],
    horas: "10 hs",
  },
]

// Función para obtener el color según el tipo de materia
const getTipoColor = (tipo: string) => {
  switch (tipo) {
    case "Formación General":
      return "bg-blue-100 border-blue-300 text-blue-800"
    case "Formación Específica":
      return "bg-green-100 border-green-300 text-green-800"
    case "Práctica Profesional":
      return "bg-purple-100 border-purple-300 text-purple-800"
    default:
      return "bg-gray-100 border-gray-300 text-gray-800"
  }
}

// Función para obtener el color según el formato
const getFormatoColor = (formato: string) => {
  switch (formato) {
    case "Asignatura":
      return "bg-blue-50 text-blue-700"
    case "Seminario":
      return "bg-green-50 text-green-700"
    case "Taller":
      return "bg-orange-50 text-orange-700"
    case "Seminario-Taller":
      return "bg-purple-50 text-purple-700"
    case "Variable":
      return "bg-gray-50 text-gray-700"
    default:
      return "bg-gray-50 text-gray-700"
  }
}

// Función para obtener el estado de correlativa (A o R) según la materia y su correlativa
const getCorrelativaStatus = (materiaId: string, correlativaId: string): string => {
  const statusMap: Record<string, Record<string, string>> = {
    // 2º AÑO
    "filosofia": {
      "pedagogia": "R"
    },
    "psicologia-educacional": {
      "pedagogia": "R"
    },
    "educacion-sexual": {
      "corporeidad-juego": "R"
    },
    "procesos-feudalismo-modernidad": {
      "procesos-antiguedad": "A",
      "historia-ideas-1": "A",
      "pueblos-originarios": "R",
      "problematica-conocimiento": "R"
    },
    "procesos-americanos-1": {
      "pueblos-originarios": "R"
    },
    "historia-ideas-2": {
      "historia-ideas-1": "A",
      "problematica-conocimiento": "R"
    },
    "mundo-territorialidades": {
      "historia-ideas-1": "R",
      "pueblos-originarios": "R",
      "procesos-antiguedad": "R"
    },
    "economia-politica": {
      "procesos-antiguedad": "R",
      "historia-ideas-1": "R"
    },
    "didactica-ciencias-sociales": {
      "didactica-general": "A",
      "problematica-conocimiento": "R",
      "procesos-antiguedad": "A",
      "historia-ideas-1": "A"
    },
    "sujetos-educacion": {
      "didactica-general": "R",
      "pedagogia": "R"
    },
    "practica-2": {
      "practica-1": "A",
      "pedagogia": "R",
      "didactica-general": "A"
    },
    // 3º AÑO
    "historia-politica-educacion": {
      "pedagogia": "A"
    },
    "instituciones-educativas": {
      "sujetos-educacion": "R",
      "practica-1": "A",
      "practica-2": "R"
    },
    "procesos-contemporaneos-1": {
      "procesos-feudalismo-modernidad": "A",
      "didactica-ciencias-sociales": "A",
      "procesos-americanos-1": "R",
      "historia-ideas-2": "R",
      "economia-politica": "R"
    },
    "procesos-americanos-2": {
      "procesos-feudalismo-modernidad": "R",
      "procesos-americanos-1": "R"
    },
    "procesos-argentina-1": {
      "procesos-americanos-1": "R",
      "mundo-territorialidades": "R"
    },
    "epistemologia-historia": {
      "filosofia": "R",
      "problematica-conocimiento": "R",
      "historia-ideas-2": "R"
    },
    "didactica-historia": {
      "didactica-ciencias-sociales": "A",
      "sujetos-educacion": "R"
    },
    "practica-3": {
      "practica-2": "A",
      "psicologia-educacional": "R",
      "sujetos-educacion": "R",
      "procesos-feudalismo-modernidad": "A",
      "didactica-ciencias-sociales": "R",
      "procesos-americanos-1": "R",
      "historia-ideas-2": "R",
      "mundo-territorialidades": "R",
      "economia-politica": "R"
    },
    // 4º AÑO
    "derechos-humanos": {
      "filosofia": "R"
    },
    "procesos-contemporaneos-2": {
      "procesos-contemporaneos-1": "A",
      "didactica-historia": "R",
      "procesos-americanos-2": "R",
      "procesos-argentina-1": "R"
    },
    "procesos-americanos-3": {
      "procesos-contemporaneos-1": "R",
      "procesos-americanos-2": "R",
      "procesos-argentina-1": "R"
    },
    "procesos-argentina-2": {
      "procesos-americanos-2": "R",
      "procesos-argentina-1": "R",
      "procesos-contemporaneos-1": "R"
    },
    "problematicas-regionales": {
      "procesos-contemporaneos-1": "R",
      "didactica-historia": "R",
      "procesos-americanos-1": "R",
      "procesos-argentina-1": "R",
      "epistemologia-historia": "R"
    },
    "practica-4": {
      "practica-3": "A",
      "instituciones-educativas": "R",
      "procesos-contemporaneos-1": "A",
      "didactica-historia": "A",
      "procesos-americanos-2": "R",
      "procesos-argentina-1": "R",
      "epistemologia-historia": "R",
      "udi-1": "R"
    }
  }
  
  return statusMap[materiaId]?.[correlativaId] || "R"
}

// Función para descargar la visualización
const downloadVisualization = () => {
  let content = `MAPA DE CORRELATIVIDADES
Profesorado de Educación Secundaria en Historia
Instituto Superior de Ciencias Sociales

`

  // Agrupar por años
  for (let año = 1; año <= 4; año++) {
    content += `${año}° AÑO\n`
    content += "=" + "=".repeat(10) + "\n\n"

    const materiasDelAño = materias.filter((m) => m.año === año)

    materiasDelAño.forEach((materia, index) => {
      content += `${index + 1}. ${materia.nombre} (${materia.codigo})\n`
      content += `   Tipo: ${materia.tipo}\n`
      content += `   Formato: ${materia.formato}\n`
      content += `   Carga horaria: ${materia.horas}\n`

      if (materia.correlativas.length > 0) {
        const correlativasNombres = materia.correlativas.map((corrId) => {
          const corrMateria = materias.find((m) => m.id === corrId)
          return corrMateria ? `${corrMateria.nombre} (${corrMateria.codigo})` : corrId
        })
        content += `   Correlativas: ${correlativasNombres.join(", ")}\n`
      } else {
        content += `   Correlativas: Ninguna\n`
      }
      content += "\n"
    })
    content += "\n"
  }

  // Crear y descargar archivo
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = "Mapa_Correlatividades_Historia_ISCS.txt"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export default function CorrelativasCascada(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMateria, setSelectedMateria] = useState<Materia | null>(null)
  const [filtroTipo, setFiltroTipo] = useState<string>("todos")
  const [filtroAño, setFiltroAño] = useState<number | null>(null)
  const [modoCompacto, setModoCompacto] = useState(false)
  const [zoom, setZoom] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  // Filtrar materias según búsqueda y filtros
  const materiasFiltradas = materias.filter((materia) => {
    const matchSearch =
      materia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      materia.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchTipo = filtroTipo === "todos" || materia.tipo === filtroTipo
    const matchAño = filtroAño === null || materia.año === filtroAño

    return matchSearch && matchTipo && matchAño
  })

  // Obtener materias que dependen de una materia específica
  const getDependientes = (materiaId: string): Materia[] => {
    return materias.filter((m) => m.correlativas.includes(materiaId))
  }

  // Obtener todas las correlativas de una materia (recursivo)
  const getTodasCorrelativas = (materiaId: string): string[] => {
    const materia = materias.find((m) => m.id === materiaId)
    if (!materia || materia.correlativas.length === 0) return []

    let todasCorrelativas: string[] = [...materia.correlativas]

    materia.correlativas.forEach((corrId) => {
      const correlativasRecursivas = getTodasCorrelativas(corrId)
      todasCorrelativas = [...todasCorrelativas, ...correlativasRecursivas]
    })

    return [...new Set(todasCorrelativas)]
  }

  // Resetear filtros
  const resetFiltros = () => {
    setSearchTerm("")
    setFiltroTipo("todos")
    setFiltroAño(null)
    setSelectedMateria(null)
    setZoom(1)
  }

  // Controles de zoom
  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2))
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5))

  return (
    <div className="w-full space-y-6">
      {/* Controles superiores */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Búsqueda */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar materia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="todos">Todos los tipos</option>
                <option value="Formación General">Formación General</option>
                <option value="Formación Específica">Formación Específica</option>
                <option value="Práctica Profesional">Práctica Profesional</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={filtroAño || ""}
                onChange={(e) => setFiltroAño(e.target.value ? Number.parseInt(e.target.value) : null)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="">Todos los años</option>
                <option value="1">1° Año</option>
                <option value="2">2° Año</option>
                <option value="3">3° Año</option>
                <option value="4">4° Año</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="modo-compacto" checked={modoCompacto} onCheckedChange={setModoCompacto} />
              <Label htmlFor="modo-compacto" className="text-sm">
                Compacto
              </Label>
            </div>
          </div>

          {/* Controles de zoom y acciones */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={zoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600 min-w-[60px] text-center">{Math.round(zoom * 100)}%</span>
            <Button variant="outline" size="sm" onClick={zoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={resetFiltros}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={downloadVisualization}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Visualización principal */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div ref={containerRef} className="overflow-auto" style={{ height: "70vh" }}>
          <div
            className="p-6 transition-transform duration-200"
            style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
          >
            {/* Vista en cascada por años */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((año) => {
                const materiasDelAño = materiasFiltradas.filter((m) => m.año === año)

                return (
                  <div key={año} className="space-y-4">
                    <div className="text-center">
                      <h3
                        className={`text-xl font-bold mb-4 ${
                          año === 1
                            ? "text-blue-700"
                            : año === 2
                              ? "text-green-700"
                              : año === 3
                                ? "text-orange-700"
                                : "text-purple-700"
                        }`}
                      >
                        {año}° Año
                      </h3>
                      <div className="text-sm text-gray-500">{materiasDelAño.length} materias</div>
                    </div>

                    <div className="space-y-3">
                      {materiasDelAño.map((materia) => {
                        const dependientes = getDependientes(materia.id)
                        const todasCorrelativas = getTodasCorrelativas(materia.id)
                        const isHighlighted =
                          selectedMateria &&
                          (selectedMateria.id === materia.id ||
                            selectedMateria.correlativas.includes(materia.id) ||
                            todasCorrelativas.includes(selectedMateria.id))

                        return (
                          <motion.div
                            key={materia.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`relative cursor-pointer transition-all duration-200 ${
                              isHighlighted ? "ring-2 ring-blue-500 shadow-lg" : ""
                            }`}
                            onClick={() => setSelectedMateria(selectedMateria?.id === materia.id ? null : materia)}
                          >
                            <div
                              className={`
                              border-2 rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-shadow
                              ${getTipoColor(materia.tipo)}
                              ${modoCompacto ? "p-2" : "p-3"}
                            `}
                            >
                              <div className="space-y-2">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="font-bold text-sm">{materia.codigo}</div>
                                    <div className={`text-xs leading-tight ${modoCompacto ? "line-clamp-2" : ""}`}>
                                      {materia.nombre}
                                    </div>
                                  </div>
                                  {selectedMateria?.id === materia.id && (
                                    <Info className="h-4 w-4 text-blue-600 flex-shrink-0" />
                                  )}
                                </div>

                                {!modoCompacto && (
                                  <div className="flex flex-wrap gap-1">
                                    <Badge variant="outline" className={`text-xs ${getFormatoColor(materia.formato)}`}>
                                      {materia.formato}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {materia.horas}
                                    </Badge>
                                  </div>
                                )}

                                {/* Indicadores de correlatividades */}
                                {materia.correlativas.length > 0 && (
                                  <div className="flex items-center space-x-1">
                                    <div className="text-xs text-gray-500">Req:</div>
                                    <div className="flex flex-wrap gap-1">
                                      {materia.correlativas.map((corrId) => {
                                        const corrMateria = materias.find((m) => m.id === corrId)
                                        return corrMateria ? (
                                          <Badge
                                            key={corrId}
                                            variant="outline"
                                            className="text-xs bg-yellow-50 text-yellow-700 border-yellow-300"
                                          >
                                            {corrMateria.codigo}
                                          </Badge>
                                        ) : null
                                      })}
                                    </div>
                                  </div>
                                )}

                                {/* Indicadores de dependientes */}
                                {dependientes.length > 0 && !modoCompacto && (
                                  <div className="flex items-center space-x-1">
                                    <ChevronRight className="h-3 w-3 text-gray-400" />
                                    <div className="text-xs text-gray-500">
                                      Habilita {dependientes.length} materia{dependientes.length > 1 ? "s" : ""}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Líneas de conexión visual */}
                              {materia.correlativas.length > 0 && (
                                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
                                  <div className="w-4 h-0.5 bg-gray-300"></div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Panel de información detallada */}
      <AnimatePresence>
        {selectedMateria && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedMateria.nombre}</h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={getTipoColor(selectedMateria.tipo)}>{selectedMateria.tipo}</Badge>
                    <Badge className={getFormatoColor(selectedMateria.formato)}>{selectedMateria.formato}</Badge>
                    <Badge variant="outline">{selectedMateria.año}° Año</Badge>
                    <Badge variant="outline">{selectedMateria.horas}</Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedMateria(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Correlativas */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Correlativas Requeridas</h4>
                  {selectedMateria.correlativas.length > 0 ? (
                    <div className="space-y-2">
                      {selectedMateria.correlativas.map((corrId) => {
                        const corrMateria = materias.find((m) => m.id === corrId)
                        return corrMateria ? (
                          <div
                            key={corrId}
                            className="flex items-center space-x-2 p-2 bg-yellow-50 rounded-lg border border-yellow-200"
                          >
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                              {corrMateria.codigo}
                            </Badge>
                            <span className="text-sm text-gray-700">{corrMateria.nombre} ({getCorrelativaStatus(selectedMateria.id, corrId)})</span>
                          </div>
                        ) : null
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No requiere correlativas previas</p>
                  )}
                </div>

                {/* Materias que habilita */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Materias que Habilita</h4>
                  {(() => {
                    const dependientes = getDependientes(selectedMateria.id)
                    return dependientes.length > 0 ? (
                      <div className="space-y-2">
                        {dependientes.map((depMateria) => (
                          <div
                            key={depMateria.id}
                            className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg border border-green-200"
                          >
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              {depMateria.codigo}
                            </Badge>
                            <span className="text-sm text-gray-700">{depMateria.nombre}</span>
                            <Badge variant="outline" className="text-xs">
                              {depMateria.año}° Año
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No es correlativa de otras materias</p>
                    )
                  })()}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Leyenda */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-3">Leyenda</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2">Tipos de Formación</h5>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
                <span className="text-sm text-gray-600">Formación General</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                <span className="text-sm text-gray-600">Formación Específica</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded"></div>
                <span className="text-sm text-gray-600">Práctica Profesional</span>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2">Formatos Curriculares</h5>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Badge className="bg-blue-50 text-blue-700 text-xs">Asignatura</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-50 text-green-700 text-xs">Seminario</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-orange-50 text-orange-700 text-xs">Taller</Badge>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2">Correlatividades</h5>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Badge className="bg-yellow-50 text-yellow-700 border-yellow-300 text-xs">Req</Badge>
                <span className="text-sm text-gray-600">Correlativa requerida</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-0.5 bg-gray-300"></div>
                <span className="text-sm text-gray-600">Conexión de dependencia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
