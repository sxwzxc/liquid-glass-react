import { useState, useRef, useEffect } from 'react'
import LiquidGlass from 'liquid-glass-react'
import {
  Home, Music, Layout, Sliders, Cloud, Bell, Search, Settings,
  Play, Pause, SkipBack, SkipForward, Volume2, Heart, Shuffle, Repeat,
  Sun, Wind, Droplets, Eye, Thermometer, Star, Download, Trash2,
  CheckCircle2, AlertCircle, Info, Wifi, Battery, Bluetooth,
  Monitor, Moon, Globe, Lock, User, Mail, Phone, MapPin, X, Minus, Square,
} from 'lucide-react'

// Type declaration for Electron preload API
declare global {
  interface Window {
    electronAPI?: {
      minimize: () => void
      maximize: () => void
      close: () => void
    }
  }
}

type Tab = 'dashboard' | 'media' | 'widgets' | 'components' | 'settings'

// ─── Title Bar ───────────────────────────────────────────────────────────────
function TitleBar({ activeTab }: { activeTab: Tab }) {
  const tabLabels: Record<Tab, string> = {
    dashboard: 'Dashboard',
    media: 'Media Player',
    widgets: 'Widgets',
    components: 'Components',
    settings: 'Settings',
  }
  return (
    <div
      className="app-titlebar flex items-center justify-between px-4 h-10 bg-black/30 border-b border-white/10 flex-shrink-0"
    >
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
        <span className="text-white/70 text-sm font-medium">
          Liquid Glass Demo — {tabLabels[activeTab]}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <button
          className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors"
          onClick={() => window.electronAPI?.minimize()}
          title="Minimize"
        >
          <Minus size={14} />
        </button>
        <button
          className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors"
          onClick={() => window.electronAPI?.maximize()}
          title="Maximize"
        >
          <Square size={12} />
        </button>
        <button
          className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-red-400 hover:bg-red-500/20 rounded transition-colors"
          onClick={() => window.electronAPI?.close()}
          title="Close"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const navItems: { id: Tab; icon: React.ComponentType<{ size?: number }>; label: string }[] = [
  { id: 'dashboard', icon: Home, label: 'Dashboard' },
  { id: 'media', icon: Music, label: 'Media' },
  { id: 'widgets', icon: Cloud, label: 'Widgets' },
  { id: 'components', icon: Layout, label: 'Components' },
  { id: 'settings', icon: Settings, label: 'Settings' },
]

function Sidebar({ active, onSelect }: { active: Tab; onSelect: (t: Tab) => void }) {
  return (
    <div className="w-20 flex flex-col items-center py-6 gap-2 bg-black/20 border-r border-white/10 flex-shrink-0">
      {navItems.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          title={label}
          className={`w-12 h-12 flex flex-col items-center justify-center gap-1 rounded-xl transition-all
            ${active === id
              ? 'bg-white/15 text-white shadow-lg'
              : 'text-white/40 hover:text-white/70 hover:bg-white/5'
            }`}
        >
          <Icon size={20} />
          <span className="text-[9px] font-medium leading-none">{label}</span>
        </button>
      ))}
    </div>
  )
}

// ─── Dashboard Tab ────────────────────────────────────────────────────────────
function DashboardTab() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [notifVisible, setNotifVisible] = useState(true)

  return (
    <div
      ref={containerRef}
      className="relative flex-1 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 70%, #0f3460 100%)',
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-20 left-32 w-64 h-64 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
      <div className="absolute bottom-24 right-40 w-80 h-80 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #2563eb, transparent)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #db2777, transparent)' }} />

      {/* User Profile Card */}
      <LiquidGlass
        style={{ position: 'absolute', top: '18%', left: '22%' }}
        mouseContainer={containerRef}
        cornerRadius={24}
        displacementScale={80}
        padding="20px 28px"
      >
        <div className="w-64">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
              JD
            </div>
            <div>
              <p className="font-semibold text-base">Jane Doe</p>
              <p className="text-xs text-white/60">UI / UX Designer</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-white/70">
              <Mail size={13} /> <span>jane@example.com</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Phone size={13} /> <span>+1 (555) 234-5678</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <MapPin size={13} /> <span>Seattle, WA</span>
            </div>
          </div>
        </div>
      </LiquidGlass>

      {/* Stats Cards */}
      {[
        { label: 'Projects', value: '24', icon: Star, color: '#f59e0b' },
        { label: 'Tasks Done', value: '138', icon: CheckCircle2, color: '#10b981' },
        { label: 'Messages', value: '57', icon: Mail, color: '#3b82f6' },
        { label: 'Following', value: '312', icon: User, color: '#8b5cf6' },
      ].map((stat, i) => (
        <LiquidGlass
          key={stat.label}
          style={{ position: 'absolute', top: `${18 + i * 14}%`, left: `${55 + (i % 2) * 18}%` }}
          mouseContainer={containerRef}
          cornerRadius={16}
          displacementScale={60}
          padding="14px 20px"
        >
          <div className="flex items-center gap-3">
            <stat.icon size={20} style={{ color: stat.color }} />
            <div>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs text-white/60">{stat.label}</p>
            </div>
          </div>
        </LiquidGlass>
      ))}

      {/* Quick Actions */}
      <LiquidGlass
        style={{ position: 'absolute', top: '72%', left: '22%' }}
        mouseContainer={containerRef}
        cornerRadius={20}
        displacementScale={70}
        padding="16px 24px"
      >
        <div>
          <p className="text-sm font-semibold mb-3 text-white/80">Quick Actions</p>
          <div className="flex gap-2">
            {[
              { icon: Download, label: 'Download', color: 'bg-blue-500/30' },
              { icon: Mail, label: 'Message', color: 'bg-purple-500/30' },
              { icon: Bell, label: 'Notify', color: 'bg-amber-500/30' },
              { icon: Trash2, label: 'Delete', color: 'bg-red-500/30' },
            ].map(({ icon: Icon, label, color }) => (
              <button key={label} title={label}
                className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center hover:scale-110 transition-transform`}>
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>
      </LiquidGlass>

      {/* Notification toast */}
      {notifVisible && (
        <LiquidGlass
          style={{ position: 'absolute', top: '72%', left: '62%' }}
          mouseContainer={containerRef}
          cornerRadius={16}
          displacementScale={55}
          padding="12px 18px"
        >
          <div className="flex items-start gap-3 w-56">
            <div className="w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={16} className="text-green-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Upload Complete</p>
              <p className="text-xs text-white/50 mt-0.5">design-v3.fig (4.2 MB)</p>
            </div>
            <button onClick={() => setNotifVisible(false)} className="text-white/30 hover:text-white/70">
              <X size={14} />
            </button>
          </div>
        </LiquidGlass>
      )}
    </div>
  )
}

// ─── Media Player Tab ─────────────────────────────────────────────────────────
function MediaTab() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(38)
  const [volume, setVolume] = useState(70)
  const [liked, setLiked] = useState(false)
  const [shuffled, setShuffled] = useState(false)

  const tracks = [
    { title: 'Midnight Dreams', artist: 'Luna Echo', duration: '3:47' },
    { title: 'Neon Horizon', artist: 'Synthwave Bros', duration: '4:12' },
    { title: 'Glass Ocean', artist: 'Aria Storm', duration: '3:29' },
    { title: 'Electric Soul', artist: 'Pixel Waves', duration: '5:01' },
  ]
  const [currentTrack, setCurrentTrack] = useState(0)

  return (
    <div
      ref={containerRef}
      className="relative flex-1 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #1a0533 0%, #0d1b4b 35%, #1a0533 70%, #0d0d1a 100%)',
      }}
    >
      {/* Album art background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, #2563eb 50%, transparent 70%)' }} />
      </div>
      <div className="absolute top-16 right-16 w-64 h-64 rounded-full opacity-20 blur-2xl"
        style={{ background: 'radial-gradient(circle, #db2777, transparent)' }} />

      {/* Main Player */}
      <LiquidGlass
        style={{ position: 'absolute', top: '22%', left: '30%' }}
        mouseContainer={containerRef}
        cornerRadius={28}
        displacementScale={90}
        padding="28px 36px"
      >
        <div className="w-80">
          {/* Album art placeholder */}
          <div className="w-full h-40 rounded-2xl mb-5 flex items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.4), rgba(37,99,235,0.4))' }}>
            <div className={`w-20 h-20 rounded-full border-4 border-white/20 flex items-center justify-center transition-transform ${playing ? 'animate-spin' : ''}`}
              style={{ animationDuration: '4s', background: 'rgba(255,255,255,0.1)' }}>
              <Music size={32} className="text-white/70" />
            </div>
          </div>

          {/* Track info */}
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="font-bold text-lg">{tracks[currentTrack].title}</p>
              <p className="text-sm text-white/60">{tracks[currentTrack].artist}</p>
            </div>
            <button onClick={() => setLiked(l => !l)} className="transition-transform hover:scale-110">
              <Heart size={20} fill={liked ? '#f43f5e' : 'none'} stroke={liked ? '#f43f5e' : 'currentColor'} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <input type="range" min="0" max="100" value={progress}
              onChange={e => setProgress(+e.target.value)}
              className="w-full accent-purple-400" />
            <div className="flex justify-between text-xs text-white/40 mt-1">
              {/* Convert progress (0-100) to mm:ss based on track duration "m:ss" */}
              {(() => {
                const [m, s] = tracks[currentTrack].duration.split(':').map(Number)
                const totalSec = m * 60 + s
                const elapsed = Math.floor((progress / 100) * totalSec)
                const mm = Math.floor(elapsed / 60)
                const ss = String(elapsed % 60).padStart(2, '0')
                return <span>{mm}:{ss}</span>
              })()}
              <span>{tracks[currentTrack].duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <button onClick={() => setShuffled(s => !s)}
              className={`transition-colors ${shuffled ? 'text-purple-400' : 'text-white/40 hover:text-white/70'}`}>
              <Shuffle size={18} />
            </button>
            <button onClick={() => setCurrentTrack(t => (t - 1 + tracks.length) % tracks.length)}
              className="text-white/70 hover:text-white transition-colors">
              <SkipBack size={22} />
            </button>
            <button
              onClick={() => setPlaying(p => !p)}
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:scale-105"
            >
              {playing ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={() => setCurrentTrack(t => (t + 1) % tracks.length)}
              className="text-white/70 hover:text-white transition-colors">
              <SkipForward size={22} />
            </button>
            <button className="text-white/40 hover:text-white/70 transition-colors">
              <Repeat size={18} />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3 mt-4">
            <Volume2 size={16} className="text-white/50 flex-shrink-0" />
            <input type="range" min="0" max="100" value={volume}
              onChange={e => setVolume(+e.target.value)}
              className="flex-1 accent-blue-400" />
            <span className="text-xs text-white/40 w-8 text-right">{volume}%</span>
          </div>
        </div>
      </LiquidGlass>

      {/* Playlist */}
      <LiquidGlass
        style={{ position: 'absolute', top: '22%', left: '68%' }}
        mouseContainer={containerRef}
        cornerRadius={20}
        displacementScale={65}
        padding="20px 24px"
      >
        <div className="w-56">
          <p className="text-sm font-semibold mb-3 text-white/70">Up Next</p>
          <div className="space-y-2">
            {tracks.map((track, i) => (
              <button
                key={track.title}
                onClick={() => setCurrentTrack(i)}
                className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all text-left
                  ${currentTrack === i ? 'bg-white/15' : 'hover:bg-white/8'}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0
                  ${currentTrack === i ? 'bg-purple-500/40 text-purple-200' : 'bg-white/10 text-white/40'}`}>
                  {currentTrack === i && playing ? '▶' : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{track.title}</p>
                  <p className="text-xs text-white/50 truncate">{track.artist}</p>
                </div>
                <span className="text-xs text-white/30">{track.duration}</span>
              </button>
            ))}
          </div>
        </div>
      </LiquidGlass>
    </div>
  )
}

// ─── Widgets Tab ──────────────────────────────────────────────────────────────
function WidgetsTab() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const today = time.getDate()
  const calDays = Array.from({ length: 35 }, (_, i) => {
    const d = i - new Date(time.getFullYear(), time.getMonth(), 1).getDay() + 1
    return d > 0 && d <= new Date(time.getFullYear(), time.getMonth() + 1, 0).getDate() ? d : null
  })

  const weatherConditions = [
    { icon: Sun, label: 'Sunny', color: '#f59e0b' },
    { icon: Cloud, label: 'Cloudy', color: '#94a3b8' },
    { icon: Wind, label: 'Windy', color: '#60a5fa' },
  ]

  return (
    <div
      ref={containerRef}
      className="relative flex-1 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a1628 0%, #1e3a5f 40%, #0a1628 100%)',
      }}
    >
      {/* Stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            opacity: Math.random() * 0.7 + 0.1,
          }} />
      ))}

      {/* Clock Widget */}
      <LiquidGlass
        style={{ position: 'absolute', top: '12%', left: '12%' }}
        mouseContainer={containerRef}
        cornerRadius={24}
        displacementScale={85}
        padding="24px 32px"
      >
        <div className="text-center w-52">
          <div className="text-5xl font-thin tracking-tight mb-1">
            {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
          </div>
          <div className="text-sm text-white/50">
            {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </LiquidGlass>

      {/* Weather Widget */}
      <LiquidGlass
        style={{ position: 'absolute', top: '12%', left: '52%' }}
        mouseContainer={containerRef}
        cornerRadius={24}
        displacementScale={75}
        padding="22px 28px"
      >
        <div className="w-56">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-3xl font-light">72°F</p>
              <p className="text-sm text-white/60 mt-1">Seattle, WA</p>
            </div>
            <Sun size={40} className="text-amber-300 opacity-80" />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { icon: Thermometer, label: 'Feels', value: '69°' },
              { icon: Droplets, label: 'Humid', value: '58%' },
              { icon: Wind, label: 'Wind', value: '8 mph' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white/8 rounded-xl p-2">
                <Icon size={14} className="mx-auto mb-1 text-white/50" />
                <p className="text-xs font-medium">{value}</p>
                <p className="text-[10px] text-white/40">{label}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 pt-3 border-t border-white/10">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => {
              const Cond = weatherConditions[i % weatherConditions.length]
              return (
                <div key={day} className="flex flex-col items-center gap-1">
                  <p className="text-[10px] text-white/40">{day}</p>
                  <Cond.icon size={14} style={{ color: Cond.color }} />
                  <p className="text-xs">{68 + i}°</p>
                </div>
              )
            })}
          </div>
        </div>
      </LiquidGlass>

      {/* Calendar Widget */}
      <LiquidGlass
        style={{ position: 'absolute', top: '58%', left: '12%' }}
        mouseContainer={containerRef}
        cornerRadius={20}
        displacementScale={70}
        padding="18px 22px"
      >
        <div className="w-56">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold">
              {time.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {days.map(d => (
              <div key={d} className="text-[10px] text-white/30 pb-1">{d}</div>
            ))}
            {calDays.map((d, i) => (
              <div key={i}
                className={`text-xs w-7 h-7 mx-auto flex items-center justify-center rounded-full transition-colors
                  ${d === today ? 'bg-blue-500 text-white font-bold' : d ? 'text-white/70 hover:bg-white/10 cursor-pointer' : ''}`}
              >
                {d}
              </div>
            ))}
          </div>
        </div>
      </LiquidGlass>

      {/* System Stats Widget */}
      <LiquidGlass
        style={{ position: 'absolute', top: '58%', left: '52%' }}
        mouseContainer={containerRef}
        cornerRadius={20}
        displacementScale={65}
        padding="18px 24px"
      >
        <div className="w-56">
          <p className="text-sm font-semibold mb-3 text-white/70">System</p>
          {[
            { label: 'CPU', value: 34, color: '#3b82f6' },
            { label: 'Memory', value: 67, color: '#8b5cf6' },
            { label: 'Disk', value: 52, color: '#10b981' },
            { label: 'GPU', value: 21, color: '#f59e0b' },
          ].map(({ label, value, color }) => (
            <div key={label} className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/60">{label}</span>
                <span style={{ color }}>{value}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all"
                  style={{ width: `${value}%`, background: color }} />
              </div>
            </div>
          ))}
        </div>
      </LiquidGlass>
    </div>
  )
}

// ─── Components Tab ───────────────────────────────────────────────────────────
function ComponentsTab() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [toggles, setToggles] = useState([true, false, true, false])
  const [selectedOption, setSelectedOption] = useState('option1')
  const [inputVal, setInputVal] = useState('')
  const [rating, setRating] = useState(3)
  const [sliderVal, setSliderVal] = useState(60)
  const [checkboxes, setCheckboxes] = useState([true, false, true])

  const toggleToggle = (i: number) =>
    setToggles(ts => ts.map((t, j) => (j === i ? !t : t)))
  const toggleCheckbox = (i: number) =>
    setCheckboxes(cs => cs.map((c, j) => (j === i ? !c : c)))

  return (
    <div
      ref={containerRef}
      className="relative flex-1 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
      }}
    >
      <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #4f46e5, transparent)' }} />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />

      {/* Buttons Panel */}
      <LiquidGlass
        style={{ position: 'absolute', top: '10%', left: '10%' }}
        mouseContainer={containerRef}
        cornerRadius={20}
        displacementScale={75}
        padding="20px 24px"
      >
        <div className="w-64">
          <p className="text-sm font-semibold mb-4 text-white/70">Buttons</p>
          <div className="space-y-2">
            {[
              { label: 'Primary Action', cls: 'bg-blue-500/40 hover:bg-blue-500/60 border border-blue-400/30' },
              { label: 'Secondary', cls: 'bg-white/10 hover:bg-white/20 border border-white/15' },
              { label: 'Danger / Delete', cls: 'bg-red-500/30 hover:bg-red-500/50 border border-red-400/30' },
              { label: 'Success', cls: 'bg-green-500/30 hover:bg-green-500/50 border border-green-400/30' },
            ].map(({ label, cls }) => (
              <button key={label}
                className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${cls}`}>
                {label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            {[Download, Bell, Settings, Heart].map((Icon, i) => (
              <button key={i}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-105">
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>
      </LiquidGlass>

      {/* Toggles & Checkboxes */}
      <LiquidGlass
        style={{ position: 'absolute', top: '10%', left: '55%' }}
        mouseContainer={containerRef}
        cornerRadius={20}
        displacementScale={70}
        padding="20px 24px"
      >
        <div className="w-56">
          <p className="text-sm font-semibold mb-4 text-white/70">Toggles</p>
          {['Dark Mode', 'Notifications', 'Auto-save', 'Sync'].map((label, i) => (
            <div key={label} className="flex items-center justify-between mb-3">
              <span className="text-sm text-white/80">{label}</span>
              <button
                onClick={() => toggleToggle(i)}
                className={`relative w-11 h-6 rounded-full transition-colors ${toggles[i] ? 'bg-blue-500' : 'bg-white/20'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform
                  ${toggles[i] ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          ))}
          <p className="text-sm font-semibold mb-3 mt-4 text-white/70">Checkboxes</p>
          {['Remember me', 'Subscribe', 'Accept terms'].map((label, i) => (
            <div key={label} className="flex items-center gap-3 mb-2">
              <button
                onClick={() => toggleCheckbox(i)}
                className={`w-5 h-5 rounded flex items-center justify-center transition-colors flex-shrink-0
                  ${checkboxes[i] ? 'bg-blue-500' : 'bg-white/10 border border-white/20'}`}
              >
                {checkboxes[i] && <CheckCircle2 size={14} />}
              </button>
              <span className="text-sm text-white/80">{label}</span>
            </div>
          ))}
        </div>
      </LiquidGlass>

      {/* Input & Select */}
      <LiquidGlass
        style={{ position: 'absolute', top: '60%', left: '10%' }}
        mouseContainer={containerRef}
        cornerRadius={20}
        displacementScale={70}
        padding="20px 24px"
      >
        <div className="w-64">
          <p className="text-sm font-semibold mb-4 text-white/70">Form Inputs</p>

          {/* Search input */}
          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 mb-3">
            <Search size={14} className="text-white/40 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              className="bg-transparent text-sm outline-none flex-1 placeholder-white/30"
            />
          </div>

          {/* Select */}
          <select
            value={selectedOption}
            onChange={e => setSelectedOption(e.target.value)}
            className="w-full bg-white/10 rounded-xl px-3 py-2 text-sm outline-none mb-3 cursor-pointer"
          >
            <option value="option1" className="bg-gray-800">Option 1</option>
            <option value="option2" className="bg-gray-800">Option 2</option>
            <option value="option3" className="bg-gray-800">Option 3</option>
          </select>

          {/* Slider */}
          <div>
            <div className="flex justify-between text-xs text-white/50 mb-1">
              <span>Volume</span>
              <span>{sliderVal}%</span>
            </div>
            <input type="range" min="0" max="100" value={sliderVal}
              onChange={e => setSliderVal(+e.target.value)}
              className="w-full accent-purple-400" />
          </div>

          {/* Star Rating */}
          <div className="mt-3">
            <p className="text-xs text-white/50 mb-2">Rating</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} onClick={() => setRating(n)}>
                  <Star size={20} fill={n <= rating ? '#f59e0b' : 'none'} stroke={n <= rating ? '#f59e0b' : '#ffffff50'} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </LiquidGlass>

      {/* Alerts / Badges */}
      <LiquidGlass
        style={{ position: 'absolute', top: '60%', left: '55%' }}
        mouseContainer={containerRef}
        cornerRadius={20}
        displacementScale={65}
        padding="20px 24px"
      >
        <div className="w-56">
          <p className="text-sm font-semibold mb-4 text-white/70">Alerts & Badges</p>
          <div className="space-y-2 mb-4">
            {[
              { icon: CheckCircle2, msg: 'Operation successful!', color: 'text-green-400', bg: 'bg-green-500/15' },
              { icon: AlertCircle, msg: 'Warning: Low storage', color: 'text-amber-400', bg: 'bg-amber-500/15' },
              { icon: Info, msg: 'New update available', color: 'text-blue-400', bg: 'bg-blue-500/15' },
            ].map(({ icon: Icon, msg, color, bg }) => (
              <div key={msg} className={`flex items-center gap-2 px-3 py-2 rounded-xl ${bg}`}>
                <Icon size={14} className={color} />
                <span className="text-xs text-white/80">{msg}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/50 mb-2">Status Badges</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Online', color: 'bg-green-500/30 text-green-300' },
              { label: 'Busy', color: 'bg-red-500/30 text-red-300' },
              { label: 'Away', color: 'bg-amber-500/30 text-amber-300' },
              { label: 'New', color: 'bg-blue-500/30 text-blue-300' },
              { label: 'Pro', color: 'bg-purple-500/30 text-purple-300' },
            ].map(({ label, color }) => (
              <span key={label}
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </LiquidGlass>

      {/* Radio group */}
      <LiquidGlass
        style={{ position: 'absolute', top: '10%', left: '32%' }}
        mouseContainer={containerRef}
        cornerRadius={16}
        displacementScale={60}
        padding="16px 20px"
      >
        <div className="w-44">
          <p className="text-sm font-semibold mb-3 text-white/70">Theme</p>
          {['System Default', 'Light Mode', 'Dark Mode'].map(opt => (
            <label key={opt} className="flex items-center gap-3 mb-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                ${selectedOption === opt ? 'border-blue-400' : 'border-white/30 group-hover:border-white/50'}`}
                onClick={() => setSelectedOption(opt)}>
                {selectedOption === opt && <div className="w-2 h-2 rounded-full bg-blue-400" />}
              </div>
              <span className="text-sm text-white/80">{opt}</span>
            </label>
          ))}
        </div>
      </LiquidGlass>
    </div>
  )
}

// ─── Settings Tab ─────────────────────────────────────────────────────────────
function SettingsTab() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [glassSettings, setGlassSettings] = useState({
    displacementScale: 80,
    blurAmount: 0.4,
    saturation: 150,
    aberrationIntensity: 3,
    elasticity: 0.2,
    cornerRadius: 24,
  })
  const [mode, setMode] = useState<'standard' | 'polar' | 'prominent' | 'shader'>('standard')
  const [overLight, setOverLight] = useState(false)
  const [activeSection, setActiveSection] = useState<'appearance' | 'glass' | 'account' | 'system'>('glass')

  const set = (k: keyof typeof glassSettings) => (v: number) =>
    setGlassSettings(s => ({ ...s, [k]: v }))

  const settingsSections = [
    { id: 'glass' as const, icon: Eye, label: 'Glass Effect' },
    { id: 'appearance' as const, icon: Moon, label: 'Appearance' },
    { id: 'account' as const, icon: User, label: 'Account' },
    { id: 'system' as const, icon: Monitor, label: 'System' },
  ]

  return (
    <div
      ref={containerRef}
      className="relative flex-1 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%)',
      }}
    >
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
      <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #0ea5e9, transparent)' }} />

      {/* Settings Navigation */}
      <LiquidGlass
        style={{ position: 'absolute', top: '15%', left: '8%' }}
        mouseContainer={containerRef}
        cornerRadius={20}
        displacementScale={60}
        padding="16px 14px"
      >
        <div className="w-44">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 px-2">Settings</p>
          {settingsSections.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left mb-1
                ${activeSection === id ? 'bg-white/15 text-white font-medium' : 'text-white/60 hover:text-white/80 hover:bg-white/8'}`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </LiquidGlass>

      {/* Glass Effect Settings */}
      {activeSection === 'glass' && (
        <LiquidGlass
          style={{ position: 'absolute', top: '15%', left: '38%' }}
          mouseContainer={containerRef}
          displacementScale={glassSettings.displacementScale}
          blurAmount={glassSettings.blurAmount}
          saturation={glassSettings.saturation}
          aberrationIntensity={glassSettings.aberrationIntensity}
          elasticity={glassSettings.elasticity}
          cornerRadius={glassSettings.cornerRadius}
          overLight={overLight}
          mode={mode}
          padding="24px 28px"
        >
          <div className="w-80">
            <p className="font-semibold mb-5">Glass Effect Settings</p>
            {([
              { label: 'Displacement Scale', key: 'displacementScale' as const, min: 0, max: 200, step: 1, unit: '', color: 'text-blue-300' },
              { label: 'Blur Amount', key: 'blurAmount' as const, min: 0, max: 1, step: 0.01, unit: '', color: 'text-green-300', toFixed: 2 },
              { label: 'Saturation', key: 'saturation' as const, min: 100, max: 300, step: 10, unit: '%', color: 'text-purple-300' },
              { label: 'Chromatic Aberration', key: 'aberrationIntensity' as const, min: 0, max: 20, step: 1, unit: '', color: 'text-cyan-300' },
              { label: 'Elasticity', key: 'elasticity' as const, min: 0, max: 1, step: 0.05, unit: '', color: 'text-orange-300', toFixed: 2 },
              { label: 'Corner Radius', key: 'cornerRadius' as const, min: 0, max: 60, step: 2, unit: 'px', color: 'text-pink-300' },
            ] as const).map(({ label, key, min, max, step, unit, color, toFixed }) => (
              <div key={key} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-white/70">{label}</span>
                  <span className={`text-sm font-mono ${color}`}>
                    {toFixed ? glassSettings[key].toFixed(toFixed) : glassSettings[key]}{unit}
                  </span>
                </div>
                <input type="range" min={min} max={max} step={step}
                  value={glassSettings[key]}
                  onChange={e => set(key)(+e.target.value)}
                  className="w-full accent-indigo-400" />
              </div>
            ))}

            {/* Mode selector */}
            <div className="mb-4">
              <p className="text-sm text-white/70 mb-2">Refraction Mode</p>
              <div className="grid grid-cols-2 gap-2">
                {(['standard', 'polar', 'prominent', 'shader'] as const).map(m => (
                  <button key={m} onClick={() => setMode(m)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors
                      ${mode === m ? 'bg-indigo-500/50 text-indigo-200' : 'bg-white/8 text-white/50 hover:bg-white/15'}`}>
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Over Light toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Over Light Mode</span>
              <button
                onClick={() => setOverLight(l => !l)}
                className={`relative w-11 h-6 rounded-full transition-colors ${overLight ? 'bg-indigo-500' : 'bg-white/20'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform
                  ${overLight ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>
        </LiquidGlass>
      )}

      {/* Appearance Settings */}
      {activeSection === 'appearance' && (
        <LiquidGlass
          style={{ position: 'absolute', top: '15%', left: '38%' }}
          mouseContainer={containerRef}
          cornerRadius={24}
          displacementScale={70}
          padding="24px 28px"
        >
          <div className="w-72">
            <p className="font-semibold mb-5">Appearance</p>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-white/70 mb-2">Color Theme</p>
                <div className="flex gap-2">
                  {['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'].map(color => (
                    <button key={color}
                      className="w-8 h-8 rounded-full border-2 border-transparent hover:border-white/50 transition-all hover:scale-110"
                      style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-white/70 mb-2">Font Size</p>
                <div className="flex gap-2">
                  {['Small', 'Medium', 'Large'].map(size => (
                    <button key={size}
                      className={`flex-1 py-1.5 rounded-lg text-xs transition-colors
                        ${size === 'Medium' ? 'bg-blue-500/40 text-blue-200' : 'bg-white/10 text-white/60 hover:bg-white/15'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-white/70 mb-2">Background</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    'linear-gradient(135deg, #0f0c29, #302b63)',
                    'linear-gradient(135deg, #0a1628, #1e3a5f)',
                    'linear-gradient(135deg, #111827, #1f2937)',
                  ].map((bg, i) => (
                    <div key={i} className="h-12 rounded-xl cursor-pointer hover:ring-2 hover:ring-white/30"
                      style={{ background: bg }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </LiquidGlass>
      )}

      {/* Account Settings */}
      {activeSection === 'account' && (
        <LiquidGlass
          style={{ position: 'absolute', top: '15%', left: '38%' }}
          mouseContainer={containerRef}
          cornerRadius={24}
          displacementScale={70}
          padding="24px 28px"
        >
          <div className="w-72">
            <p className="font-semibold mb-5">Account</p>
            <div className="flex items-center gap-3 p-3 bg-white/8 rounded-2xl mb-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center font-bold">JD</div>
              <div>
                <p className="font-medium">Jane Doe</p>
                <p className="text-xs text-white/50">jane@example.com</p>
              </div>
              <button className="ml-auto text-xs text-blue-400 hover:text-blue-300">Edit</button>
            </div>
            <div className="space-y-3">
              {[
                { icon: Lock, label: 'Change Password', detail: 'Last changed 30 days ago' },
                { icon: Globe, label: 'Language', detail: 'English (US)' },
                { icon: Bell, label: 'Notifications', detail: 'All notifications on' },
                { icon: Bluetooth, label: 'Connected Devices', detail: '2 devices' },
                { icon: Wifi, label: 'Network', detail: 'Connected' },
              ].map(({ icon: Icon, label, detail }) => (
                <button key={label}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/8 transition-colors text-left">
                  <Icon size={16} className="text-white/50 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm">{label}</p>
                    <p className="text-xs text-white/40">{detail}</p>
                  </div>
                  <span className="text-white/20">›</span>
                </button>
              ))}
            </div>
          </div>
        </LiquidGlass>
      )}

      {/* System Settings */}
      {activeSection === 'system' && (
        <LiquidGlass
          style={{ position: 'absolute', top: '15%', left: '38%' }}
          mouseContainer={containerRef}
          cornerRadius={24}
          displacementScale={70}
          padding="24px 28px"
        >
          <div className="w-72">
            <p className="font-semibold mb-5">System</p>
            <div className="space-y-4">
              <div className="p-3 bg-white/8 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Battery size={16} className="text-green-400" />
                  <span className="text-sm font-medium">Battery</span>
                  <span className="ml-auto text-sm text-green-400">87%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400 rounded-full" style={{ width: '87%' }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Storage', value: '128 GB', sub: '52 GB used', icon: Monitor },
                  { label: 'RAM', value: '16 GB', sub: '9.3 GB used', icon: Globe },
                ].map(({ label, value, sub, icon: Icon }) => (
                  <div key={label} className="p-3 bg-white/8 rounded-xl">
                    <Icon size={14} className="text-white/40 mb-2" />
                    <p className="text-sm font-medium">{value}</p>
                    <p className="text-xs text-white/40">{label}</p>
                    <p className="text-xs text-white/30 mt-1">{sub}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm text-white/70 mb-2">About</p>
                <div className="space-y-1.5 text-xs text-white/50">
                  <div className="flex justify-between"><span>App Version</span><span>1.0.0</span></div>
                  <div className="flex justify-between"><span>Electron</span><span>v33.x</span></div>
                  <div className="flex justify-between"><span>Platform</span><span>Windows x64</span></div>
                </div>
              </div>
            </div>
          </div>
        </LiquidGlass>
      )}
    </div>
  )
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white overflow-hidden">
      <TitleBar activeTab={activeTab} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar active={activeTab} onSelect={setActiveTab} />
        <main className="flex-1 overflow-hidden flex">
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'media' && <MediaTab />}
          {activeTab === 'widgets' && <WidgetsTab />}
          {activeTab === 'components' && <ComponentsTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </main>
      </div>
    </div>
  )
}
