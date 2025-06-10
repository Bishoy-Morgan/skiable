'use client'

import React, { useState } from 'react'
import Button from '@/src/components/ui/Button'
import { useRouter } from 'next/navigation'
// Add framer-motion import
import { motion, AnimatePresence } from 'framer-motion'

const ContactForm = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setSuccess(null)
        setError(null)
        try {
            const res = await fetch('/api/v1/contacts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            const data = await res.json()
            if (data.success) {
                setSuccess('Your message has been sent!')
                setForm({ name: '', email: '', message: '' })
                setTimeout(() => {
                    router.push('/')
                }, 1000)
            } else {
                setError('Something went wrong. Please try again.')
            }
        } catch {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.form
            className="w-full max-w-lg mt-10 p-8 flex flex-col items-center gap-6 shadow-lg rounded-xl "
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <AnimatePresence>
                {success && (
                    <motion.p
                        className="text-green-600 mt-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {success}
                    </motion.p>
                )}
                {error && (
                    <motion.p
                        className="text-red-600 mt-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
            <motion.div
                className='w-full'
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
            >
                <label htmlFor="name" className="block mb-2 font-medium para-14">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-4 outline-none bg-[#fffefc] rounded-xl placeholder:text-black/50 text-black text-base placeholder:text-base transition duration-150 ease-in-out shadow-lg "
                    required
                />
            </motion.div>
            <motion.div
                className='w-full'
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                <label htmlFor="email" className="block mb-2 font-medium para-14">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-4 outline-none bg-[#fffefc] rounded-xl placeholder:text-black/50 text-black text-base placeholder:text-base transition duration-150 ease-in-out  shadow-lg"
                    required
                />
            </motion.div>
            <motion.div
                className='w-full'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <label htmlFor="message" className="block mb-2 font-medium para-14">Message</label>
                <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-4 outline-none bg-[#fffefc] rounded-xl placeholder:text-black/50 text-black text-base placeholder:text-base transition duration-150 ease-in-out shadow-lg "
                    required
                />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full flex justify-center"
            >
                <Button
                    iconAlt='Submit button'
                    type="submit"
                    className='max-w-44'
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send Message'}
                </Button>
            </motion.div>
        </motion.form>
    )
}

export default ContactForm