import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useStore } from '../../contexts/StoreContext'
import { DEFAULT_TAGLINE, DEFAULT_SOCIAL } from '../../lib/brand'
import { updateSettings } from '../../services/api'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import toast from 'react-hot-toast'

export default function Settings() {
  const { isAdmin } = useAuth()
  const { settings } = useStore()
  if (!isAdmin) return <Navigate to="/admin" replace />
  const [form, setForm] = useState({
    boutique_name: '',
    tagline: '',
    whatsapp_number: '',
    hero_image_url: '',
    logo_url: '',
    social_links: { instagram: '', facebook: '', pinterest: '' },
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (settings) {
      setForm({
        boutique_name: settings.boutique_name || '',
        tagline: settings.tagline || '',
        whatsapp_number: settings.whatsapp_number || '',
        hero_image_url: settings.hero_image_url || '',
        logo_url: settings.logo_url || '',
        social_links: { ...DEFAULT_SOCIAL, ...settings.social_links },
      })
    }
  }, [settings])

  const setSocial = (key, val) =>
    setForm((f) => ({ ...f, social_links: { ...f.social_links, [key]: val } }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateSettings({
        boutique_name: form.boutique_name,
        tagline: form.tagline,
        whatsapp_number: form.whatsapp_number.replace(/\D/g, ''),
        hero_image_url: form.hero_image_url,
        logo_url: form.logo_url,
        social_links: form.social_links,
      })
      toast.success('Settings saved — changes appear on storefront instantly')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-semibold mb-2">Settings</h1>
      <p className="text-stone-500 text-sm mb-8">Configure WhatsApp number, branding, and social links. No code editing required.</p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-700">
        <Input label="Boutique Name" value={form.boutique_name} onChange={(e) => setForm({ ...form, boutique_name: e.target.value })} />
        <Input
          label="Tagline (hero text)"
          value={form.tagline}
          onChange={(e) => setForm({ ...form, tagline: e.target.value })}
          placeholder={DEFAULT_TAGLINE}
        />
        <Input
          label="WhatsApp Number (digits only, with country code)"
          value={form.whatsapp_number}
          onChange={(e) => setForm({ ...form, whatsapp_number: e.target.value })}
          placeholder="33612345678"
        />
        <Input label="Logo URL (optional)" value={form.logo_url} onChange={(e) => setForm({ ...form, logo_url: e.target.value })} />
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wider text-stone-500">Social Links</p>
          {['instagram', 'facebook'].map((key) => (
            <Input key={key} label={key} value={form.social_links[key] || ''} onChange={(e) => setSocial(key, e.target.value)} />
          ))}
        </div>
        <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save Settings'}</Button>
      </form>
    </div>
  )
}
