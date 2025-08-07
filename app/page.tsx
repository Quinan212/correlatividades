"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, Calendar, Clock, ChevronRight, Target, Lightbulb, School, BookMarked, Network, Download, GraduationCap, FileText, MapPin, Phone, Mail, Globe } from 'lucide-react'
import CorrelativasCascada from "../correlatividades-cascada"

// Plan de estudios corregido con nombres exactos
const planEstudios = {
  "1": [
    { nombre: "Pedagogía", tipo: "Formación General", horas: "4 hs cátedra", formato: "Asignatura" },
    {
      nombre: "Problemática del Conocimiento Histórico",
      tipo: "Formación Específica",
      horas: "4 hs cátedra",
      formato: "Asignatura",
    },
    {
      nombre: "Procesos Sociales, Políticos, Económicos y Culturales de la Antigüedad",
      tipo: "Formación Específica",
      horas: "5 hs cátedra",
      formato: "Asignatura",
    },
    { nombre: "Historia de las Ideas I", tipo: "Formación Específica", horas: "3 hs cátedra", formato: "Seminario" },
    {
      nombre: "Procesos Sociales, Políticos, Económicos y Culturales de los Pueblos Originarios de América",
      tipo: "Formación Específica",
      horas: "4 hs cátedra",
      formato: "Asignatura",
    },
    {
      nombre: "Oralidad, Lectura, Escritura y TIC",
      tipo: "Formación General",
      horas: "3 hs cátedra",
      formato: "Taller",
    },
    {
      nombre: "Corporeidad, Juego y Lenguajes Artísticos",
      tipo: "Formación General",
      horas: "3 hs cátedra",
      formato: "Taller",
    },
    {
      nombre: "Práctica Docente I - Sujetos y Contextos",
      tipo: "Práctica Profesional",
      horas: "4 hs cátedra",
      formato: "Seminario-Taller",
    },
    { nombre: "Didáctica General", tipo: "Formación General", horas: "4 hs cátedra", formato: "Asignatura" },
  ],
  "2": [
    { nombre: "Filosofía", tipo: "Formación General", horas: "3 hs cátedra", formato: "Asignatura" },
    { nombre: "Psicología Educacional", tipo: "Formación General", horas: "4 hs cátedra", formato: "Asignatura" },
    { nombre: "Educación Sexual Integral", tipo: "Formación General", horas: "2 hs cátedra", formato: "Taller" },
    {
      nombre: "Procesos Sociales, Políticos, Económicos y Culturales del Feudalismo y la Modernidad",
      tipo: "Formación Específica",
      horas: "4 hs cátedra",
      formato: "Asignatura",
    },
    {
      nombre: "Procesos Sociales, Políticos, Económicos y Culturales Americanos I",
      tipo: "Formación Específica",
      horas: "3 hs cátedra",
      formato: "Asignatura",
    },
    { nombre: "Historia de las Ideas II", tipo: "Formación Específica", horas: "3 hs cátedra", formato: "Seminario" },
    {
      nombre: "El Mundo y las Nuevas Territorialidades",
      tipo: "Formación Específica",
      horas: "3 hs cátedra",
      formato: "Asignatura",
    },
    { nombre: "Economía Política", tipo: "Formación Específica", horas: "3 hs cátedra", formato: "Seminario" },
    {
      nombre: "Didáctica de las Ciencias Sociales",
      tipo: "Formación Específica",
      horas: "3 hs cátedra",
      formato: "Seminario",
    },
    {
      nombre: "Sujetos de la Educación Secundaria",
      tipo: "Formación General",
      horas: "3 hs cátedra",
      formato: "Seminario",
    },
    {
      nombre: "Práctica Docente II - Educación Secundaria y Práctica Docente",
      tipo: "Práctica Profesional",
      horas: "4 hs cátedra",
      formato: "Seminario-Taller",
    },
  ],
  "3": [
    {
      nombre: "Historia y Política de la Educación Argentina",
      tipo: "Formación General",
      horas: "3 hs cátedra",
      formato: "Asignatura",
    },
    { nombre: "Sociología de la Educación", tipo: "Formación General", horas: "3 hs cátedra", formato: "Asignatura" },
    {
      nombre: "Análisis y Organización de las Instituciones Educativas",
      tipo: "Formación General",
      horas: "3 hs cátedra",
      formato: "Asignatura",
    },
    {
      nombre: "Procesos Sociales, Políticos, Económicos y Culturales Contemporáneos I",
      tipo: "Formación Específica",
      horas: "3 hs cátedra",
      formato: "Asignatura",
    },
    {
      nombre: "Procesos Sociales, Políticos, Económicos y Culturales Americanos II",
      tipo: "Formación Específica",
      horas: "3 hs cátedra",
      formato: "Asignatura",
    },
    {
      nombre: "Procesos Sociales, Políticos, Económicos y Culturales de Argentina I",
      tipo: "Formación Específica",
      horas: "4 hs cátedra",
      formato: "Asignatura",
    },
    {
      nombre: "Epistemología de la Historia",
      tipo: "Formación Específica",
      horas: "3 hs cátedra",
      formato: "Seminario",
    },
    { nombre: "Didáctica de la Historia", tipo: "Formación Específica", horas: "3 hs cátedra", formato: "Seminario" },
    {
      nombre: "UDI I",
      tipo: "Formación Específica",
      horas: "3 hs cátedra",
      formato: "Variable",
    },
    {
      nombre: "Práctica Docente III - Cotidianeidad en las Aulas",
      tipo: "Práctica Profesional",
      horas: "6 hs cátedra",
      formato: "Seminario-Taller",
    },
  ],
  "4": [
    {
      nombre: "Derechos Humanos: Ética y Ciudadanía",
      tipo: "Formación General",
      horas: "3 hs cátedra",
      formato: "Asignatura",
    },
    {
      nombre: "Procesos Sociales, Políticos, Económicos y Culturales Contemporáneos II",
      tipo: "Formación Específica",
      horas: "3 hs cátedra",
      formato: "Asignatura",
    },
    {
      nombre: "Procesos Sociales, Políticos, Económicos y Culturales Americanos III",
      tipo: "Formación Específica",
      horas: "4 hs cátedra",
      formato: "Asignatura",
    },
    {
      nombre: "Procesos Sociales, Políticos, Económicos y Culturales de Argentina II",
      tipo: "Formación Específica",
      horas: "4 hs cátedra",
      formato: "Seminario-Taller",
    },
    {
      nombre: "Problemáticas Históricas Regionales y Locales",
      tipo: "Formación Específica",
      horas: "4 hs cátedra",
      formato: "Taller",
    },
    {
      nombre: "UDI II",
      tipo: "Formación Específica",
      horas: "3 hs cátedra",
      formato: "Variable",
    },
    {
      nombre: "Práctica Docente IV - Residencia",
      tipo: "Práctica Profesional",
      horas: "10 hs cátedra",
      formato: "Seminario-Taller",
    },
  ],
}

// Definición completa de nodos para la red de correlatividades con correlatividades corregidas
const networkNodes = [
  // PRIMER AÑO
  { id: "PED", nombre: "Pedagogía", año: 1, tipo: "Formación General", x: 100, y: 100, correlativas: [] },
  {
    id: "PCH",
    nombre: "Problemática del Conocimiento Histórico",
    año: 1,
    tipo: "Formación Específica",
    x: 250,
    y: 80,
    correlativas: [],
  },
  {
    id: "ANT",
    nombre: "Procesos de la Antigüedad",
    año: 1,
    tipo: "Formación Específica",
    x: 400,
    y: 120,
    correlativas: [],
  },
  {
    id: "HI1",
    nombre: "Historia de las Ideas I",
    año: 1,
    tipo: "Formación Específica",
    x: 550,
    y: 100,
    correlativas: [],
  },
  {
    id: "POA",
    nombre: "Pueblos Originarios de América",
    año: 1,
    tipo: "Formación Específica",
    x: 700,
    y: 140,
    correlativas: [],
  },
  { id: "OLT", nombre: "Oralidad, Lectura y TIC", año: 1, tipo: "Formación General", x: 150, y: 200, correlativas: [] },
  { id: "CJA", nombre: "Corporeidad y Juego", año: 1, tipo: "Formación General", x: 300, y: 220, correlativas: [] },
  { id: "PD1", nombre: "Práctica Docente I", año: 1, tipo: "Práctica Profesional", x: 450, y: 200, correlativas: [] },
  { id: "DG", nombre: "Didáctica General", año: 1, tipo: "Formación General", x: 600, y: 220, correlativas: [] },

  // SEGUNDO AÑO
  {
    id: "FIL",
    nombre: "Filosofía",
    año: 2,
    tipo: "Formación General",
    x: 80,
    y: 320,
    correlativas: [{ id: "PED", tipo: "R" }],
  },
  {
    id: "PE",
    nombre: "Psicología Educacional",
    año: 2,
    tipo: "Formación General",
    x: 200,
    y: 300,
    correlativas: [{ id: "PED", tipo: "R" }],
  },
  {
    id: "ESI",
    nombre: "Educación Sexual Integral",
    año: 2,
    tipo: "Formación General",
    x: 320,
    y: 340,
    correlativas: [{ id: "CJA", tipo: "R" }],
  },
  {
    id: "FM",
    nombre: "Feudalismo y Modernidad",
    año: 2,
    tipo: "Formación Específica",
    x: 440,
    y: 300,
    correlativas: [
      { id: "ANT", tipo: "R" },
      { id: "HI1", tipo: "R" },
      { id: "POA", tipo: "R" },
      { id: "PCH", tipo: "R" },
    ],
  },
  {
    id: "AM1",
    nombre: "Americanos I",
    año: 2,
    tipo: "Formación Específica",
    x: 560,
    y: 320,
    correlativas: [{ id: "POA", tipo: "R" }],
  },
  {
    id: "HI2",
    nombre: "Historia de las Ideas II",
    año: 2,
    tipo: "Formación Específica",
    x: 680,
    y: 300,
    correlativas: [
      { id: "HI1", tipo: "R" },
      { id: "PCH", tipo: "R" },
    ],
  },
  {
    id: "MT",
    nombre: "Mundo y Territorialidades",
    año: 2,
    tipo: "Formación Específica",
    x: 120,
    y: 400,
    correlativas: [
      { id: "HI1", tipo: "R" },
      { id: "POA", tipo: "R" },
      { id: "ANT", tipo: "R" },
    ],
  },
  {
    id: "EP",
    nombre: "Economía Política",
    año: 2,
    tipo: "Formación Específica",
    x: 260,
    y: 420,
    correlativas: [
      { id: "ANT", tipo: "R" },
      { id: "HI1", tipo: "R" },
      { id: "DG", tipo: "R" },
      { id: "PCH", tipo: "R" },
    ],
  },
  {
    id: "DCS",
    nombre: "Didáctica de CCSS",
    año: 2,
    tipo: "Formación Específica",
    x: 400,
    y: 400,
    correlativas: [
      { id: "ANT", tipo: "R" },
      { id: "HI1", tipo: "R" },
    ],
  },
  {
    id: "SE",
    nombre: "Sujetos de Educación",
    año: 2,
    tipo: "Formación General",
    x: 540,
    y: 420,
    correlativas: [
      { id: "DG", tipo: "R" },
      { id: "PED", tipo: "R" },
    ],
  },
  {
    id: "PD2",
    nombre: "Práctica Docente II",
    año: 2,
    tipo: "Práctica Profesional",
    x: 680,
    y: 400,
    correlativas: [
      { id: "PD1", tipo: "R" },
      { id: "PED", tipo: "R" },
      { id: "DG", tipo: "R" },
    ],
  },

  // TERCER AÑO
  {
    id: "HPE",
    nombre: "Historia y Política Educación",
    año: 3,
    tipo: "Formación General",
    x: 100,
    y: 520,
    correlativas: [{ id: "PED", tipo: "R" }],
  },
  {
    id: "SOE",
    nombre: "Sociología de la Educación",
    año: 3,
    tipo: "Formación General",
    x: 240,
    y: 500,
    correlativas: [],
  },
  {
    id: "IE",
    nombre: "Instituciones Educativas",
    año: 3,
    tipo: "Formación General",
    x: 380,
    y: 540,
    correlativas: [
      { id: "SE", tipo: "R" },
      { id: "PD1", tipo: "R" },
      { id: "PD2", tipo: "R" },
    ],
  },
  {
    id: "C1",
    nombre: "Contemporáneos I",
    año: 3,
    tipo: "Formación Específica",
    x: 520,
    y: 520,
    correlativas: [
      { id: "FM", tipo: "R" },
      { id: "DCS", tipo: "R" },
      { id: "AM1", tipo: "R" },
      { id: "HI2", tipo: "R" },
      { id: "EP", tipo: "R" },
    ],
  },
  {
    id: "AM2",
    nombre: "Americanos II",
    año: 3,
    tipo: "Formación Específica",
    x: 660,
    y: 500,
    correlativas: [
      { id: "AM1", tipo: "R" },
      { id: "MT", tipo: "R" },
    ],
  },
  {
    id: "AR1",
    nombre: "Argentina I",
    año: 3,
    tipo: "Formación Específica",
    x: 160,
    y: 620,
    correlativas: [
      { id: "AM1", tipo: "R" },
      { id: "MT", tipo: "R" },
    ],
  },
  {
    id: "EH",
    nombre: "Epistemología Historia",
    año: 3,
    tipo: "Formación Específica",
    x: 320,
    y: 640,
    correlativas: [
      { id: "FIL", tipo: "R" },
      { id: "PCH", tipo: "R" },
      { id: "HI2", tipo: "R" },
    ],
  },
  {
    id: "DH",
    nombre: "Didáctica de la Historia",
    año: 3,
    tipo: "Formación Específica",
    x: 480,
    y: 620,
    correlativas: [
      { id: "DCS", tipo: "R" },
      { id: "SE", tipo: "R" },
    ],
  },
  {
    id: "UDI1",
    nombre: "UDI I",
    año: 3,
    tipo: "Formación Específica",
    x: 80,
    y: 720,
    correlativas: [],
  },
  {
    id: "PD3",
    nombre: "Práctica Docente III",
    año: 3,
    tipo: "Práctica Profesional",
    x: 640,
    y: 640,
    correlativas: [
      { id: "PD2", tipo: "R" },
      { id: "PE", tipo: "R" },
      { id: "SE", tipo: "R" },
      { id: "FM", tipo: "R" },
      { id: "DCS", tipo: "R" },
      { id: "AM1", tipo: "R" },
      { id: "HI2", tipo: "R" },
      { id: "MT", tipo: "R" },
      { id: "EP", tipo: "R" },
    ],
  },

  // CUARTO AÑO
  {
    id: "DHU",
    nombre: "Derechos Humanos",
    año: 4,
    tipo: "Formación General",
    x: 120,
    y: 740,
    correlativas: [{ id: "FIL", tipo: "R" }],
  },
  {
    id: "C2",
    nombre: "Contemporáneos II",
    año: 4,
    tipo: "Formación Específica",
    x: 280,
    y: 720,
    correlativas: [
      { id: "C1", tipo: "R" },
      { id: "DH", tipo: "R" },
      { id: "AM2", tipo: "R" },
      { id: "AR1", tipo: "R" },
    ],
  },
  {
    id: "AM3",
    nombre: "Americanos III",
    año: 4,
    tipo: "Formación Específica",
    x: 440,
    y: 760,
    correlativas: [
      { id: "C1", tipo: "R" },
      { id: "AM2", tipo: "R" },
      { id: "AR1", tipo: "R" },
    ],
  },
  {
    id: "AR2",
    nombre: "Argentina II",
    año: 4,
    tipo: "Formación Específica",
    x: 600,
    y: 740,
    correlativas: [
      { id: "AM2", tipo: "R" },
      { id: "AR1", tipo: "R" },
      { id: "C1", tipo: "R" },
    ],
  },
  {
    id: "PR",
    nombre: "Problemáticas Regionales",
    año: 4,
    tipo: "Formación Específica",
    x: 200,
    y: 840,
    correlativas: [
      { id: "DH", tipo: "R" },
      { id: "AM2", tipo: "R" },
      { id: "AR1", tipo: "R" },
      { id: "EH", tipo: "R" },
    ],
  },
  {
    id: "UDI2",
    nombre: "UDI II",
    año: 4,
    tipo: "Formación Específica",
    x: 400,
    y: 860,
    correlativas: [],
  },
  {
    id: "RES",
    nombre: "Residencia",
    año: 4,
    tipo: "Práctica Profesional",
    x: 600,
    y: 840,
    correlativas: [
      { id: "SE", tipo: "R" },
      { id: "PD3", tipo: "R" },
      { id: "IE", tipo: "R" },
      { id: "C1", tipo: "R" },
      { id: "DH", tipo: "R" },
      { id: "AM2", tipo: "R" },
      { id: "AR1", tipo: "R" },
      { id: "EH", tipo: "R" },
      { id: "UDI1", tipo: "R" },
    ],
  },
]

// Información detallada de todas las materias con nombres corregidos
const materiasDetalladas = {
  // PRIMER AÑO
  pedagogia: {
    nombre: "Pedagogía",
    año: "1° Año",
    formato: "Asignatura",
    carga: "4 horas cátedra semanales",
    tipo: "Formación General",
    marco:
      "Fundamentos teóricos y prácticos de la pedagogía como ciencia de la educación. Análisis de los procesos educativos y su relación con la sociedad.",
    ejes: [
      "Pedagogía como ciencia: objeto de estudio y métodos",
      "Historia de la pedagogía y corrientes pedagógicas",
      "El acto educativo y sus componentes",
      "Pedagogía crítica y transformadora",
    ],
  },
  "problematica-conocimiento-historico": {
    nombre: "Problemática del Conocimiento Histórico",
    año: "1° Año",
    formato: "Asignatura",
    carga: "4 horas cátedra semanales",
    tipo: "Formación Específica",
    marco: "Introducción a los problemas fundamentales del conocimiento histórico, sus métodos y enfoques teóricos.",
    ejes: [
      "El conocimiento histórico: características y especificidad",
      "Fuentes históricas y metodología de la investigación",
      "Tiempo histórico y periodización",
      "Objetividad y subjetividad en la historia",
    ],
  },
  "procesos-antiguedad": {
    nombre: "Procesos Sociales, Políticos, Económicos y Culturales de la Antigüedad",
    año: "1° Año",
    formato: "Asignatura",
    carga: "5 horas cátedra semanales",
    tipo: "Formación Específica",
    marco:
      "Estudio de las civilizaciones antiguas y sus procesos históricos fundamentales desde la prehistoria hasta la caída del Imperio Romano.",
    ejes: [
      "Prehistoria y revolución neolítica",
      "Civilizaciones del Cercano Oriente",
      "Grecia: polis, democracia y cultura",
      "Roma: república, imperio y legado cultural",
    ],
  },
  "historia-ideas-1": {
    nombre: "Historia de las Ideas I",
    año: "1° Año",
    formato: "Seminario",
    carga: "3 horas cátedra semanales",
    tipo: "Formación Específica",
    marco:
      "Análisis de las corrientes de pensamiento desde la antigüedad hasta el renacimiento y su impacto en la configuración del mundo occidental.",
    ejes: [
      "Pensamiento filosófico en la antigüedad",
      "Cristianismo y pensamiento medieval",
      "Humanismo y Renacimiento",
      "Reforma y Contrarreforma",
    ],
  },
  "pueblos-originarios": {
    nombre: "Procesos Sociales, Políticos, Económicos y Culturales de los Pueblos Originarios de América",
    año: "1° Año",
    formato: "Asignatura",
    carga: "4 horas cátedra semanales",
    tipo: "Formación Específica",
    marco:
      "Estudio de las sociedades precolombinas americanas, sus formas de organización social, política, económica y cultural.",
    ejes: [
      "Poblamiento de América y primeras sociedades",
      "Civilizaciones mesoamericanas: mayas, aztecas",
      "Civilizaciones andinas: incas y culturas preincaicas",
      "Pueblos originarios del actual territorio argentino",
    ],
  },
  "oralidad-lectura-tic": {
    nombre: "Oralidad, Lectura, Escritura y TIC",
    año: "1° Año",
    formato: "Taller",
    carga: "3 horas cátedra semanales",
    tipo: "Formación General",
    marco:
      "Desarrollo de competencias comunicativas y digitales necesarias para la formación docente y el ejercicio profesional.",
    ejes: [
      "Competencias comunicativas orales y escritas",
      "Lectura crítica y comprensiva",
      "Escritura académica y profesional",
      "Tecnologías de la información y comunicación en educación",
    ],
  },
  "corporeidad-juego": {
    nombre: "Corporeidad, Juego y Lenguajes Artísticos",
    año: "1° Año",
    formato: "Taller",
    carga: "3 horas cátedra semanales",
    tipo: "Formación General",
    marco:
      "Exploración de lenguajes expresivos y corporales como herramientas pedagógicas para la formación integral del docente.",
    ejes: [
      "Corporeidad y expresión",
      "El juego como herramienta pedagógica",
      "Lenguajes artísticos en la educación",
      "Creatividad y expresión en el aula",
    ],
  },
  "practica-1": {
    nombre: "Práctica Docente I - Sujetos y Contextos",
    año: "1° Año",
    formato: "Seminario-Taller",
    carga: "4 horas cátedra semanales",
    tipo: "Práctica Profesional",
    marco:
      "Primera aproximación al campo educativo a través de la observación y análisis de contextos institucionales y sujetos de la educación.",
    ejes: [
      "Observación de instituciones educativas",
      "Análisis de contextos socio-educativos",
      "Caracterización de sujetos de la educación",
      "Reflexión sobre la práctica docente",
    ],
  },
  "didactica-general": {
    nombre: "Didáctica General",
    año: "1° Año",
    formato: "Asignatura",
    carga: "4 horas cátedra semanales",
    tipo: "Formación General",
    marco:
      "Fundamentos teóricos y metodológicos de la didáctica como disciplina que estudia los procesos de enseñanza y aprendizaje.",
    ejes: [
      "La didáctica como disciplina",
      "Proceso de enseñanza-aprendizaje",
      "Planificación y evaluación educativa",
      "Estrategias y recursos didácticos",
    ],
  },

  // SEGUNDO AÑO
  filosofia: {
    nombre: "Filosofía",
    año: "2° Año",
    formato: "Asignatura",
    carga: "3 horas cátedra semanales",
    tipo: "Formación General",
    marco: "Introducción al pensamiento filosófico y su relación con la educación y las ciencias sociales.",
    ejes: [
      "Problemas fundamentales de la filosofía",
      "Filosofía de la educación",
      "Ética y valores en la educación",
      "Filosofía política y social",
    ],
  },
  "psicologia-educacional": {
    nombre: "Psicología Educacional",
    año: "2° Año",
    formato: "Asignatura",
    carga: "4 horas cátedra semanales",
    tipo: "Formación General",
    marco:
      "Estudio de los procesos psicológicos involucrados en el aprendizaje y su aplicación en contextos educativos.",
    ejes: [
      "Psicología del desarrollo y aprendizaje",
      "Teorías del aprendizaje",
      "Motivación y procesos cognitivos",
      "Diversidad y necesidades educativas",
    ],
  },
  "educacion-sexual": {
    nombre: "Educación Sexual Integral",
    año: "2° Año",
    formato: "Taller",
    carga: "2 horas cátedra semanales",
    tipo: "Formación General",
    marco: "Formación en educación sexual integral desde una perspectiva de derechos, diversidad y respeto.",
    ejes: [
      "Marco legal de la ESI",
      "Sexualidad y diversidad",
      "Prevención de violencias",
      "Estrategias pedagógicas para la ESI",
    ],
  },
  "procesos-feudalismo-modernidad": {
    nombre: "Procesos Sociales, Políticos, Económicos y Culturales del Feudalismo y la Modernidad",
    año: "2° Año",
    formato: "Asignatura",
    carga: "4 horas cátedra semanales",
    tipo: "Formación Específica",
    marco:
      "Abordaje de los contextos asiático, africano y europeo desde el S. VI al S. XVIII en relación a las organizaciones sociopolíticas que fueron surgiendo en estos espacios.",
    ejes: [
      "Organización y desarrollo de las relaciones sociales: Comunidad Doméstica, Feudalismo y relaciones de los estamentos sociales",
      "Formas de organización de la subsistencia: Feudalismo, Mercantilismo y Capitalismo",
      "Constitución de lo político y la política: El feudalismo como orden político-institucional",
      "Construcción de sentidos y significados: Fe y Poder; la Iglesia medieval y la expansión del cristianismo",
    ],
  },
  "procesos-americanos-1": {
    nombre: "Procesos Sociales, Políticos, Económicos y Culturales Americanos I",
    año: "2° Año",
    formato: "Asignatura",
    carga: "3 horas cátedra semanales",
    tipo: "Formación Específica",
    marco:
      "Recorrido desde la conquista y colonización del espacio americano por parte de los estados monárquicos europeos hasta principios del S. XIX.",
    ejes: [
      "Relaciones y configuraciones sociales en relación a lo político y la política",
      "Construcción y representación de la sociedad en torno a lo simbólico, científico, ideológico y religioso",
      "Utilización de los recursos naturales y organización de la subsistencia de las sociedades en América",
    ],
  },
  "historia-ideas-2": {
    nombre: "Historia de las Ideas II",
    año: "2° Año",
    formato: "Seminario",
    carga: "3 horas cátedra semanales",
    tipo: "Formación Específica",
    marco:
      "Recorrido por las ideologías dominantes en occidente desde el S. XVI hasta la actualidad y su impacto en las relaciones y manifestaciones sociales.",
    ejes: [
      "Líneas del pensamiento contemporáneo desde la modernidad",
      "Líneas de pensamiento en la Argentina",
      "Ideologías dominantes y críticas al sistema liberal",
      "Derechos Humanos y democracia en Argentina",
    ],
  },
  "mundo-territorialidades": {
    nombre: "El Mundo y las Nuevas Territorialidades",
    año: "2° Año",
    formato: "Asignatura",
    carga: "3 horas cátedra semanales",
    tipo: "Formación Específica",
    marco:
      "Acercamiento de lo histórico relacionando conceptos y categorías con otras ciencias, como la economía, política y geografía.",
    ejes: [
      "Conjuntos espaciales y organización del mapa político mundial",
      "Espacio rural y urbano: diferenciación y características",
      "Problemáticas espaciotemporales contemporáneas",
    ],
  },
  "economia-politica": {
    nombre: "Economía Política",
    año: "2° Año",
    formato: "Seminario",
    carga: "3 horas cátedra semanales",
    tipo: "Formación Específica",
    marco:
      "Relación entre diferentes Ciencias Sociales para fortalecer constructos mentales y generar nuevas relaciones en base al conocimiento histórico.",
    ejes: [
      "La mirada de la Economía: conceptos básicos y sistemas económicos",
      "La Política como disciplina: lo político y la política en las sociedades contemporáneas",
    ],
  },
  "didactica-ciencias-sociales": {
    nombre: "Didáctica de las Ciencias Sociales",
    año: "2° Año",
    formato: "Seminario",
    carga: "3 horas cátedra semanales",
    tipo: "Formación Específica",
    marco:
      "Construcción de herramientas conceptuales desde diferentes miradas de la Didáctica de las Ciencias Sociales.",
    ejes: [
      "Teorías que sustentan las prácticas pedagógicas didácticas en las ciencias sociales",
      "Categorías que permiten la discusión en las ciencias sociales",
    ],
  },
  "sujetos-educacion": {
    nombre: "Sujetos de la Educación Secundaria",
    año: "2° Año",
    formato: "Seminario",
    carga: "3 horas cátedra semanales",
    tipo: "Formación General",
    marco:
      "Abordaje del sujeto de la educación desde múltiples miradas, considerando la construcción de subjetividades y procesos de integración socio-educativos.",
    ejes: [
      "Mirada desde la perspectiva socio-antropológica histórica y política",
      "Educación y subjetividad: aportes desde las perspectivas psicológicas",
      "Sujetos, vínculos y aprendizaje escolar",
      "Sujetos escolares y recorridos: trayectorias escolares",
    ],
  },
  "practica-2": {
    nombre: "Práctica Docente II - Educación Secundaria y Práctica Docente",
    año: "2° Año",
    formato: "Seminario-Taller",
    carga: "4 horas cátedra semanales",
    tipo: "Práctica Profesional",
    marco: "Profundización en el conocimiento de la educación secundaria y primeras experiencias de práctica docente.",
    ejes: [
      "La educación secundaria: características y desafíos",
      "Planificación de clases y secuencias didácticas",
      "Primeras experiencias de práctica áulica",
      "Reflexión sobre la práctica docente",
    ],
  },

  // TERCER AÑO
  "historia-politica-educacion": {
    nombre: "Historia y Política de la Educación Argentina",
    año: "3° Año",
    formato: "Asignatura",
    carga: "3 horas cátedra semanales",
    tipo: "Formación General",
    marco: "Análisis histórico del sistema educativo argentino y las políticas educativas que lo configuraron.",
    ejes: [
      "Orígenes del sistema educativo argentino",
      "Reformas educativas y políticas públicas",
      "Educación y Estado: relaciones históricas",
      "Desafíos contemporáneos de la educación argentina",
    ],
  },
  "sociologia-educacion": {
    nombre: "Sociología de la Educación",
    año: "3° Año",
    formato: "Asignatura",
    carga: "3 horas cátedra semanales",
    tipo: "Formación General",
    marco:
      "Estudio de la educación como fenómeno social y su relación con la estructura social, la cultura y el poder.",
    ejes: [
      "Educación y sociedad: enfoques sociológicos",
      "Desigualdad educativa y reproducción social",
      "Instituciones educativas y socialización",
      "Educación, cultura y diversidad",
    ],
  },
  "instituciones-educativas": {
    nombre: "Análisis y Organización de las Instituciones Educativas",
    año: "3° Año",
    formato: "Asignatura",
    carga: "3 horas cátedra semanales",
    tipo: "Formación General",
    marco: "Análisis de las instituciones educativas como organizaciones complejas y su funcionamiento interno.",
    ejes: [
      "La institución educativa como organización",
      "Gestión y liderazgo educativo",
      "Cultura institucional y clima escolar",
      "Participación y convivencia institucional",
    ],
  },
  "procesos-contemporaneos-1": {
    nombre: "Procesos Sociales, Políticos, Económicos y Culturales Contemporáneos I",
    año: "3° Año",
    formato: "Asignatura",
    carga: "3 horas cátedra semanales",
    tipo: "Formación Específica",
    marco:
      "Mirada profunda a los cambios y transformaciones del siglo XIX hasta principios del siglo XX, donde se conforman territorios e ideologías.",
    ejes: [
      "Organización y desarrollo de las relaciones sociales: transición del capitalismo y procesos de industrialización",
      "Formas de organización de la subsistencia: Capitalismo y fases de la Revolución Industrial",
      "Constitución de lo político y la política en las sociedades contemporáneas",
      "Construcción de sentidos y significados sobre la propia existencia",
    ],
  },
  "procesos-americanos-2": {
    nombre: "Procesos Sociales, Políticos, Económicos y Culturales Americanos II",
    año: "3° Año",
    formato: "Asignatura",
    carga: "3 horas cátedra semanales",
    tipo: "Formación Específica",
    marco: "Estudio de la constitución e independencia de los países de América hasta la tercera década del S. XX.",
    ejes: [
      "Relaciones y configuraciones sociales en relación a lo político y la política",
      "Construcción y representación de la sociedad en torno a lo simbólico, científico, ideológico y religioso",
      "Utilización de los recursos naturales y organización de la subsistencia de las sociedades en América",
    ],
  },
  "procesos-argentina-1": {
    nombre: "Procesos Sociales, Políticos, Económicos y Culturales de Argentina I",
    año: "3° Año",
    formato: "Asignatura",
    carga: "4 horas cátedra semanales",
    tipo: "Formación Específica",
    marco:
      "Estudio de los procesos históricos de la Argentina, desde el proceso revolucionario hasta el impacto de la crisis económica mundial de 1929.",
    ejes: [
      "Independencia, anarquía y proyección de construcción del Estado (1810-1852)",
      "La integración y organización del Estado Nacional Argentino (1853-1880)",
      "Democracia, modelo agroexportador y cuestión social (1880-1929)",
    ],
  },
  "epistemologia-historia": {
    nombre: "Epistemología de la Historia",
    año: "3° Año",
    formato: "Seminario",
    carga: "3 horas cátedra semanales",
    tipo: "Formación Específica",
    marco:
      "Análisis del devenir de la historia de la Historia. Recorrido desde la antigüedad y la Historia Literaria hasta los actuales paradigmas y tendencias de la Historia.",
    ejes: [
      "El saber histórico y su relación con la realidad socio-económica, cultural e histórica",
      "La voz del historiador desde el discurso historiográfico",
      "Distintas concepciones científicas y metodológicas de las ciencias sociales y de la historia",
    ],
  },
  "didactica-historia": {
    nombre: "Didáctica de la Historia",
    año: "3° Año",
    formato: "Seminario",
    carga: "3 horas cátedra semanales",
    tipo: "Formación Específica",
    marco:
      "Interacción con Prácticas Docentes y Residencia. Fundamentación de estrategias, recursos y selección de contenidos considerando contextos institucionales y sujetos del nivel.",
    ejes: [
      "La Historia como objeto de enseñanza y aprendizaje",
      "La construcción del conocimiento histórico",
      "Problemáticas del conocimiento histórico y su enseñanza",
      "El uso de las TIC y otros lenguajes en la enseñanza de la historia",
    ],
  },
  "udi-1": {
    nombre: "UDI I",
    año: "3° Año",
    formato: "Variable",
    carga: "3 horas cátedra semanales",
    tipo: "Formación Específica",
    marco: "Unidad de Definición Institucional que responde a necesidades específicas del contexto regional y local.",
    ejes: [
      "Contenidos definidos según necesidades institucionales",
      "Articulación con demandas del contexto regional",
      "Problemáticas específicas de la formación docente",
      "Innovación pedagógica y metodológica",
    ],
  },
  "practica-3": {
    nombre: "Práctica Docente III - Cotidianeidad en las Aulas",
    año: "3° Año",
    formato: "Seminario-Taller",
    carga: "6 horas cátedra semanales",
    tipo: "Práctica Profesional",
    marco: "Inmersión en la cotidianeidad áulica con experiencias de práctica docente supervisada.",
    ejes: [
      "Planificación y desarrollo de clases",
      "Gestión del aula y clima de aprendizaje",
      "Evaluación de los aprendizajes",
      "Reflexión crítica sobre la práctica",
    ],
  },

  // CUARTO AÑO
  "derechos-humanos": {
    nombre: "Derechos Humanos: Ética y Ciudadanía",
    año: "4° Año",
    formato: "Asignatura",
    carga: "3 horas cátedra semanales",
    tipo: "Formación General",
    marco: "Formación en derechos humanos, ética y ciudadanía como ejes transversales de la formación docente.",
    ejes: [
      "Fundamentos filosóficos de los derechos humanos",
      "Historia de los derechos humanos en Argentina",
      "Ética profesional docente",
      "Educación en derechos humanos y ciudadanía",
    ],
  },
  "procesos-contemporaneos-2": {
    nombre: "Procesos Sociales, Políticos, Económicos y Culturales Contemporáneos II",
    año: "4° Año",
    formato: "Asignatura",
    carga: "3 horas cátedra semanales",
    tipo: "Formación Específica",
    marco: "Continuación del estudio de los procesos contemporáneos, abordando el siglo XX y XXI.",
    ejes: [
      "Guerras mundiales y crisis del sistema liberal",
      "Guerra Fría y bipolarización mundial",
      "Procesos de descolonización",
      "Globalización y mundo contemporáneo",
    ],
  },
  "procesos-americanos-3": {
    nombre: "Procesos Sociales, Políticos, Económicos y Culturales Americanos III",
    año: "4° Año",
    formato: "Asignatura",
    carga: "4 horas cátedra semanales",
    tipo: "Formación Específica",
    marco: "Estudio de América Latina en el siglo XX: revoluciones, dictaduras, democracias y procesos de integración.",
    ejes: [
      "Revoluciones y movimientos sociales en América Latina",
      "Dictaduras militares y violaciones a los derechos humanos",
      "Transiciones democráticas y consolidación",
      "Integración regional y desafíos contemporáneos",
    ],
  },
  "procesos-argentina-2": {
    nombre: "Procesos Sociales, Políticos, Económicos y Culturales de Argentina II",
    año: "4° Año",
    formato: "Seminario-Taller",
    carga: "4 horas cátedra semanales",
    tipo: "Formación Específica",
    marco: "Estudio de la Argentina contemporánea desde 1930 hasta la actualidad.",
    ejes: [
      "Crisis del modelo agroexportador y surgimiento del peronismo",
      "Inestabilidad política y dictaduras militares",
      "Transición democrática y consolidación",
      "Argentina en el siglo XXI: desafíos y perspectivas",
    ],
  },
  "problematicas-regionales": {
    nombre: "Problemáticas Históricas Regionales y Locales",
    año: "4° Año",
    formato: "Taller",
    carga: "4 horas cátedra semanales",
    tipo: "Formación Específica",
    marco: "Estudio de problemáticas históricas específicas de la región entrerriana y local concordiense.",
    ejes: [
      "Historia de Entre Ríos: procesos formativos",
      "Concordia: desarrollo histórico local",
      "Problemáticas regionales contemporáneas",
      "Metodología de la investigación histórica local",
    ],
  },
  "udi-2": {
    nombre: "UDI II",
    año: "4° Año",
    formato: "Variable",
    carga: "3 horas cátedra semanales",
    tipo: "Formación Específica",
    marco: "Segunda Unidad de Definición Institucional que complementa la formación específica del estudiante.",
    ejes: [
      "Profundización en contenidos específicos",
      "Articulación teoría-práctica",
      "Investigación educativa aplicada",
      "Proyectos de intervención pedagógica",
    ],
  },
  "practica-4": {
    nombre: "Práctica Docente IV - Residencia",
    año: "4° Año",
    formato: "Seminario-Taller",
    carga: "10 horas cátedra semanales",
    tipo: "Práctica Profesional",
    marco: "Residencia docente con responsabilidad total del aula bajo supervisión. Culminación del proceso formativo.",
    ejes: [
      "Planificación anual y por unidades",
      "Desarrollo autónomo de clases",
      "Evaluación integral de los aprendizajes",
      "Reflexión final sobre la formación docente",
    ],
  },
}

const estadisticasCarrera = [
  { titulo: "Duración", valor: "4 años", icono: Calendar },
  { titulo: "Carga Horaria", valor: "2688 hs reloj", icono: Clock },
  { titulo: "Modalidad", valor: "Presencial", icono: School },
  { titulo: "Materias", valor: "37 materias", icono: BookOpen },
]

const camposFormacion = [
  {
    nombre: "Formación General",
    descripcion: "Fundamentos pedagógicos, didácticos y socio-históricos de la educación",
    materias: 11,
    color: "bg-blue-100 border-blue-200",
  },
  {
    nombre: "Formación Específica",
    descripcion: "Conocimientos disciplinares específicos de la Historia y su didáctica",
    materias: 22,
    color: "bg-green-100 border-green-200",
  },
  {
    nombre: "Práctica Profesional",
    descripcion: "Experiencias de práctica docente en instituciones educativas",
    materias: 4,
    color: "bg-purple-100 border-purple-200",
  },
]

const formatosCurriculares = [
  {
    nombre: "Asignatura",
    descripcion: "Desarrollo sistemático de conocimientos disciplinares con evaluación tradicional",
    caracteristicas: ["Clases magistrales", "Evaluaciones parciales", "Examen final"],
  },
  {
    nombre: "Seminario",
    descripcion: "Profundización en temáticas específicas con metodología de investigación",
    caracteristicas: ["Investigación grupal", "Presentaciones", "Trabajo final"],
  },
  {
    nombre: "Taller",
    descripcion: "Aprendizaje práctico y experimental con producción concreta",
    caracteristicas: ["Trabajo práctico", "Producción de materiales", "Evaluación procesual"],
  },
  {
    nombre: "Seminario-Taller",
    descripcion: "Combinación de reflexión teórica y práctica pedagógica",
    caracteristicas: ["Teoría y práctica", "Reflexión crítica", "Intervenciones"],
  },
]

// Función para descargar el plan de estudios como PDF
const downloadPlanEstudios = () => {
  // Crear contenido del plan de estudios
  let content = `PROFESORADO DE EDUCACIÓN SECUNDARIA EN HISTORIA
Instituto Superior de Ciencias Sociales
Resolución N° 0765 CGE

PLAN DE ESTUDIOS CON CORRELATIVIDADES

`

  Object.entries(planEstudios).forEach(([año, materias]) => {
    content += `${año}° AÑO\n`
    content += "=" + "=".repeat(10) + "\n\n"

    materias.forEach((materia, index) => {
      content += `${index + 1}. ${materia.nombre}\n`
      content += `   Tipo: ${materia.tipo}\n`
      content += `   Formato: ${materia.formato}\n`
      content += `   Carga horaria: ${materia.horas}\n\n`
    })
    content += "\n"
  })

  content += `CORRELATIVIDADES DETALLADAS\n`
  content += "=" + "=".repeat(25) + "\n\n"
  content += `LEYENDA:\n`
  content += `(R) = Materia correlativa debe estar REGULARIZADA\n`
  content += `(A) = Materia correlativa debe estar APROBADA\n\n`

  networkNodes.forEach((node) => {
    if (node.correlativas && node.correlativas.length > 0) {
      content += `${node.nombre} (${node.id})\n`
      content += `Correlativas:\n`
      node.correlativas.forEach((corr) => {
        const corrNode = networkNodes.find((n) => n.id === corr.id)
        if (corrNode) {
          content += `  - ${corrNode.nombre} (${corr.tipo})\n`
        }
      })
      content += "\n"
    }
  })

  // Crear y descargar archivo
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = "Plan_Estudios_Historia_ISCS_Correlatividades.txt"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

// Función para descargar el diseño curricular (placeholder hasta que tengas el archivo)
const downloadDiseñoCurricular = () => {
  // Esta función se actualizará cuando tengas el archivo completo
  // Por ahora, muestra un mensaje
  alert(
    "El archivo del Diseño Curricular se cargará próximamente. Por favor, contacta a la secretaría académica para obtener una copia.",
  )
}

export default function PresentacionCarrera() {
  const [añoSeleccionado, setAñoSeleccionado] = useState("1")
  const [seccionActiva, setSeccionActiva] = useState("inicio")
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("pedagogia")
  const [añoMateriaSeleccionado, setAñoMateriaSeleccionado] = useState("1")
  const [showCorrelativasCascada, setShowCorrelativasCascada] = useState(false)

  const scrollToSection = (sectionId: string) => {
    setSeccionActiva(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const getFormatoColor = (formato: string) => {
    switch (formato) {
      case "Asignatura":
        return "bg-blue-100 text-blue-800"
      case "Seminario":
        return "bg-green-100 text-green-800"
      case "Taller":
        return "bg-orange-100 text-orange-800"
      case "Seminario-Taller":
        return "bg-purple-100 text-purple-800"
      case "Variable":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMateriasPorAño = (año: string) => {
    return Object.entries(materiasDetalladas).filter(([key, materia]) => materia.año === `${año}° Año`)
  }

  // Si estamos mostrando la vista de correlatividades en cascada
  if (showCorrelativasCascada) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Red de Correlatividades</h1>
              <p className="text-gray-600">Profesorado de Educación Secundaria en Historia</p>
            </div>
            <Button
              onClick={() => setShowCorrelativasCascada(false)}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
              <span>Volver al Plan</span>
            </Button>
          </div>

          <CorrelativasCascada />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header fijo */}
      <header className="bg-blue-700 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_Sociales-Bandera2-removebg-preview-yVV5WCPegH59TybEPsqDnPA2qRBnki.png"
                alt="ISCS - Instituto Superior de Ciencias Sociales"
                className="h-16 w-auto object-contain"
              />
              <div>
                <h1 className="text-xl font-bold">Profesorado de Educación Secundaria en Historia</h1>
                <p className="text-sm text-blue-100">Resolución N° 0765 CGE - Formando educadores comprometidos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <nav className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-8 py-3">
              {[
                { id: "inicio", nombre: "Inicio" },
                { id: "carrera", nombre: "La Carrera" },
                { id: "plan-estudios", nombre: "Plan de Estudios" },
                { id: "materias-detalle", nombre: "Materias en Detalle" },
                { id: "metodologia", nombre: "Metodología" },
                { id: "correlatividades", nombre: "Correlatividades" },
                { id: "perfil", nombre: "Perfil del Egresado" },
                { id: "inscripcion", nombre: "Inscripción" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    seccionActiva === item.id
                      ? "text-blue-700 border-b-2 border-blue-700"
                      : "text-gray-700 hover:text-blue-700"
                  }`}
                >
                  {item.nombre}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Formá tu futuro como Profesor/a de Historia</h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Una carrera que te prepara para enseñar, investigar y transformar la educación secundaria
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-gray-100 focus:bg-gray-100"
                onClick={() => scrollToSection("inscripcion")}
              >
                Inscribite Ahora
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-700 focus:bg-white focus:text-blue-700 bg-transparent"
                onClick={() => scrollToSection("plan-estudios")}
              >
                Ver Plan de Estudios
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas de la carrera */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {estadisticasCarrera.map((stat, index) => {
              const IconComponent = stat.icono
              return (
                <Card key={index} className="text-center border border-gray-200">
                  <CardContent className="p-6">
                    <IconComponent className="h-12 w-12 text-blue-700 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{stat.valor}</h3>
                    <p className="text-gray-600">{stat.titulo}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Información de la carrera */}
      <section id="carrera" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                ¿Por qué estudiar Historia en el ISCS?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nuestro profesorado te brinda una formación integral que combina sólidos conocimientos disciplinares con
                herramientas pedagógicas innovadoras
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="border border-gray-200">
                <CardHeader>
                  <Target className="h-12 w-12 text-blue-700 mb-4" />
                  <CardTitle className="text-xl font-bold text-gray-800">Formación Integral</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Combinamos conocimientos históricos profundos con metodologías pedagógicas actualizadas para formar
                    docentes competentes y reflexivos.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardHeader>
                  <Lightbulb className="h-12 w-12 text-blue-700 mb-4" />
                  <CardTitle className="text-xl font-bold text-gray-800">Práctica desde el Primer Año</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Experiencias de práctica docente desde el inicio de la carrera en instituciones educativas urbanas,
                    periurbanas y rurales de la región.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardHeader>
                  <Users className="h-12 w-12 text-blue-700 mb-4" />
                  <CardTitle className="text-xl font-bold text-gray-800">Enfoque Regional</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Especial atención a las problemáticas históricas regionales y locales, conectando el conocimiento global con la realidad entrerriana.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Campos de formación */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Campos de Formación</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {camposFormacion.map((campo, index) => (
                  <Card key={index} className={`${campo.color} border-2`}>
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-gray-800">{campo.nombre}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{campo.materias} materias</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-sm">{campo.descripcion}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plan de Estudios */}
      <section id="plan-estudios" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Plan de Estudios</h2>
              <p className="text-xl text-gray-600">Resolución N° 0765 CGE - Estructura curricular por año académico</p>
            </div>

            <Tabs value={añoSeleccionado} onValueChange={setAñoSeleccionado} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="1">1° Año</TabsTrigger>
                <TabsTrigger value="2">2° Año</TabsTrigger>
                <TabsTrigger value="3">3° Año</TabsTrigger>
                <TabsTrigger value="4">4° Año</TabsTrigger>
              </TabsList>

              {Object.entries(planEstudios).map(([año, materias]) => (
                <TabsContent key={año} value={año} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {materias.map((materia, index) => (
                      <Card key={index} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 mb-2">{materia.nombre}</h4>
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge
                                  variant="outline"
                                  className={
                                    materia.tipo === "Formación General"
                                      ? "border-blue-300 text-blue-700"
                                      : materia.tipo === "Formación Específica"
                                        ? "border-green-300 text-green-700"
                                        : "border-purple-300 text-purple-700"
                                  }
                                >
                                  {materia.tipo}
                                </Badge>
                                <Badge className={getFormatoColor(materia.formato)}>{materia.formato}</Badge>
                                <span className="text-sm text-gray-600">{materia.horas}</span>
                              </div>
                            </div>
                            <BookOpen className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={downloadPlanEstudios}
                className="bg-blue-700 hover:bg-blue-800 text-white flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Descargar Plan de Estudios</span>
              </Button>
              <Button
                onClick={downloadDiseñoCurricular}
                variant="outline"
                className="border-blue-700 text-blue-700 hover:bg-blue-50 flex items-center space-x-2 bg-transparent"
              >
                <FileText className="h-4 w-4" />
                <span>Descargar Diseño Curricular - Res. N° 0765 CGE</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Materias en Detalle */}
      <section id="materias-detalle" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Materias en Detalle</h2>
              <p className="text-xl text-gray-600">
                Conocé en profundidad los contenidos y metodologías de todas las materias del plan de estudios
              </p>
            </div>

            {/* Selector de año */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-4">
                {["1", "2", "3", "4"].map((año) => (
                  <button
                    key={año}
                    onClick={() => {
                      setAñoMateriaSeleccionado(año)
                      const primeraMateria = getMateriasPorAño(año)[0]
                      if (primeraMateria) {
                        setMateriaSeleccionada(primeraMateria[0])
                      }
                    }}
                    className={`w-16 h-16 rounded-full font-bold text-lg transition-all ${
                      añoMateriaSeleccionado === año
                        ? "bg-blue-700 text-white shadow-lg scale-110"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:bg-gray-300"
                    }`}
                  >
                    {año}°
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Selector de materias del año */}
              <div className="lg:col-span-1">
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-800">
                      Materias de {añoMateriaSeleccionado}° Año
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {getMateriasPorAño(añoMateriaSeleccionado).map(([key, materia]) => (
                        <button
                          key={key}
                          onClick={() => setMateriaSeleccionada(key)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            materiaSeleccionada === key
                              ? "bg-blue-50 border-2 border-blue-200 text-blue-800"
                              : "bg-gray-50 hover:bg-gray-100 focus:bg-gray-100 border border-gray-200"
                          }`}
                        >
                          <p className="font-medium text-sm">{materia.nombre}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge
                              variant="outline"
                              className={
                                materia.tipo === "Formación General"
                                  ? "border-blue-300 text-blue-700 text-xs"
                                  : materia.tipo === "Formación Específica"
                                    ? "border-green-300 text-green-700 text-xs"
                                    : "border-purple-300 text-purple-700 text-xs"
                              }
                            >
                              {materia.tipo}
                            </Badge>
                            <Badge className={`${getFormatoColor(materia.formato)} text-xs`}>{materia.formato}</Badge>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detalle de la materia seleccionada */}
              <div className="lg:col-span-2">
                {materiaSeleccionada && materiasDetalladas[materiaSeleccionada] && (
                  <Card className="border border-gray-200">
                    <CardHeader className="bg-gray-50 border-b border-gray-200">
                      <CardTitle className="text-xl font-bold text-gray-800">
                        {materiasDetalladas[materiaSeleccionada].nombre}
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{materiasDetalladas[materiaSeleccionada].año}</span>
                        <Badge className={getFormatoColor(materiasDetalladas[materiaSeleccionada].formato)}>
                          {materiasDetalladas[materiaSeleccionada].formato}
                        </Badge>
                        <span>{materiasDetalladas[materiaSeleccionada].carga}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Marco Orientador</h4>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {materiasDetalladas[materiaSeleccionada].marco}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">Ejes de Contenidos</h4>
                          <div className="space-y-2">
                            {materiasDetalladas[materiaSeleccionada].ejes.map((eje, index) => (
                              <div key={index} className="flex items-start space-x-2">
                                <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                                <p className="text-gray-700 text-sm">{eje}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metodología y Formatos Curriculares */}
      <section id="metodologia" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Metodología de Enseñanza</h2>
              <p className="text-xl text-gray-600">
                Diversos formatos curriculares para una formación integral y práctica
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {formatosCurriculares.map((formato, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                      <BookMarked className="h-6 w-6 mr-2 text-blue-700" />
                      {formato.nombre}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{formato.descripcion}</p>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2">Características:</h5>
                      <ul className="space-y-1">
                        {formato.caracteristicas.map((caracteristica, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <ChevronRight className="h-3 w-3 text-blue-700 mr-2" />
                            {caracteristica}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Información sobre correlatividades */}
            <div className="mt-12">
              <Card className="border border-gray-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                    <Network className="h-6 w-6 mr-2 text-blue-700" />
                    Sistema de Correlatividades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    El plan de estudios cuenta con un sistema de correlatividades que asegura la progresión académica
                    ordenada.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2">Para Cursar:</h5>
                      <p className="text-sm text-gray-600">
                        Es suficiente tener <strong>regularizada</strong> la materia correlativa anterior.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2">Para Rendir:</h5>
                      <p className="text-sm text-gray-600">
                        Se necesita tener <strong>aprobada</strong> la materia correlativa anterior.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h5 className="font-semibold text-yellow-800 mb-2">Importante:</h5>
                    <div className="text-sm text-yellow-700">
                      <p>
                        Si la materia correlativa está <strong>regularizada</strong>, podrás cursar la materia
                        siguiente, pero para poder rendir el examen final de esta última, deberás tener{" "}
                        <strong>aprobada</strong> la materia correlativa en una mesa de examen anterior.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa de Correlatividades */}
      <section id="correlatividades" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Mapa de Correlatividades</h2>
              <p className="text-xl text-gray-600">
                Visualización completa de las relaciones entre materias del plan de estudios
              </p>
            </div>

            {/* Botón para ver la visualización avanzada */}
            <div className="flex justify-center mb-8">
              <Button
                onClick={() => setShowCorrelativasCascada(true)}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
              >
                <Network className="mr-2 h-5 w-5" />
                Ver Visualización Interactiva de Correlatividades
              </Button>
            </div>

            {/* Texto descriptivo */}
            <div className="max-w-4xl mx-auto text-center mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Sistema de Correlatividades Interactivo</h3>
                <p className="text-blue-700 mb-4">
                  Nuestro plan de estudios cuenta con un sistema de correlatividades que asegura una progresión
                  académica ordenada. Haz clic en el botón de arriba para explorar la visualización interactiva
                  completa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfil del Egresado */}
      <section id="perfil" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Perfil del Egresado</h2>
              <p className="text-xl text-gray-600">Competencias y capacidades que desarrollarás durante tu formación</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="border border-gray-200">
                <CardHeader>
                  <GraduationCap className="h-12 w-12 text-blue-700 mb-4" />
                  <CardTitle className="text-xl font-bold text-gray-800">Competencias Disciplinares</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">
                        Dominio sólido de los contenidos históricos y su epistemología
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">
                        Capacidad de investigación histórica y manejo de fuentes
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">
                        Comprensión de procesos históricos locales, regionales y globales
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">
                        Análisis crítico de problemáticas históricas contemporáneas
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardHeader>
                  <Users className="h-12 w-12 text-blue-700 mb-4" />
                  <CardTitle className="text-xl font-bold text-gray-800">Competencias Pedagógicas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">
                        Planificación y desarrollo de propuestas didácticas innovadoras
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Uso de tecnologías educativas y recursos digitales</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Evaluación integral de los aprendizajes</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">
                        Atención a la diversidad y necesidades educativas especiales
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border border-gray-200">
                <CardHeader>
                  <Target className="h-12 w-12 text-blue-700 mb-4" />
                  <CardTitle className="text-xl font-bold text-gray-800">Ámbitos de Desempeño</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">
                        Docencia en escuelas secundarias públicas y privadas
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Coordinación de áreas y proyectos educativos</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">
                        Investigación educativa y producción de materiales didácticos
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Capacitación docente y formación continua</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardHeader>
                  <Lightbulb className="h-12 w-12 text-blue-700 mb-4" />
                  <CardTitle className="text-xl font-bold text-gray-800">Competencias Transversales</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">
                        Pensamiento crítico y reflexivo sobre la práctica docente
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Compromiso ético y responsabilidad social</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Trabajo colaborativo y liderazgo educativo</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Formación continua y actualización profesional</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Inscripción */}
      <section id="inscripcion" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Inscripción</h2>
              <p className="text-xl text-gray-600">
                Información sobre el proceso de inscripción y requisitos de ingreso
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <Card className="border border-gray-200">
                <CardHeader>
                  <FileText className="h-12 w-12 text-blue-700 mb-4" />
                  <CardTitle className="text-xl font-bold text-gray-800">Requisitos de Ingreso</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Título secundario completo (original y fotocopia)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">
                        Documento Nacional de Identidad (original y fotocopia)
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Certificado de aptitud psicofísica</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">2 fotografías 4x4 actualizadas</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Ficha de inscripción completa</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardHeader>
                  <Calendar className="h-12 w-12 text-blue-700 mb-4" />
                  <CardTitle className="text-xl font-bold text-gray-800">Fechas Importantes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h5 className="font-semibold text-blue-800 mb-1">Inscripción</h5>
                      <p className="text-sm text-blue-700">Diciembre - Febrero</p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h5 className="font-semibold text-green-800 mb-1">Curso de Ingreso</h5>
                      <p className="text-sm text-green-700">Febrero - Marzo</p>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <h5 className="font-semibold text-purple-800 mb-1">Inicio de Clases</h5>
                      <p className="text-sm text-purple-700">Marzo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border border-gray-200">
                <CardHeader>
                  <MapPin className="h-12 w-12 text-blue-700 mb-4" />
                  <CardTitle className="text-xl font-bold text-gray-800">Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-blue-700 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">Dirección</p>
                        <p className="text-sm text-gray-600">Hipólito Yrigoyen 1352, Concordia, Entre Ríos</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-blue-700 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">Teléfono</p>
                        <p className="text-sm text-gray-600">(345) 4214230</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 text-blue-700 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">Email</p>
                        <p className="text-sm text-gray-600">socialesrectoria@yahoo.com.ar</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Globe className="h-5 w-5 text-blue-700 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">Sitio Web</p>
                        <p className="text-sm text-gray-600">https://iscsconcordia-ers.infd.edu.ar</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardHeader>
                  <School className="h-12 w-12 text-blue-700 mb-4" />
                  <CardTitle className="text-xl font-bold text-gray-800">Curso de Ingreso</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    El curso de ingreso es obligatorio y tiene como objetivo nivelar conocimientos básicos y
                    familiarizar a los estudiantes con la metodología de estudio universitario.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Duración: 4 semanas</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">
                        Materias: Comprensión Lectora, Historia Argentina, Metodología de Estudio
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">¿Tenés dudas sobre la inscripción?</h3>
                <p className="text-blue-700 mb-4">
                  Nuestro equipo está disponible para ayudarte con cualquier consulta sobre el proceso de inscripción o
                  la carrera.
                </p>
                <Button className="bg-blue-700 hover:bg-blue-800 text-white">Contactar Secretaría Académica</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
