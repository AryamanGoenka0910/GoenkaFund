"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BarChart3, Users, Shield, Menu } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-xl font-semibold text-gray-900 tracking-tight">Surgo</div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="hidden md:flex" onClick={() => router.push("/auth/signup")}>
                Client Portal
              </Button>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Institutional Excellence in
                <span className="text-blue-600"> Investment Management</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
                Surgo LLC delivers sophisticated investment strategies and comprehensive portfolio management
                solutions for institutional clients and high-net-worth individuals.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Surgo</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Two decades of proven expertise in alternative investment strategies and risk management
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 mb-16">
            <Card className="text-center p-8 shadow-sm border-gray-200 hover:shadow-md transition-shadow">
              <div className="mx-auto h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Analytics</h3>
              <p className="text-gray-600">
                Sophisticated quantitative models and real-time risk assessment across all asset classes.
              </p>
            </Card>

            <Card className="text-center p-8 shadow-sm border-gray-200 hover:shadow-md transition-shadow">
              <div className="mx-auto h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Risk Management</h3>
              <p className="text-gray-600">
                Comprehensive risk controls and diversification strategies to protect and grow capital.
              </p>
            </Card>

            <Card className="text-center p-8 shadow-sm border-gray-200 hover:shadow-md transition-shadow">
              <div className="mx-auto h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Team</h3>
              <p className="text-gray-600">
                Seasoned investment professionals with deep market expertise and institutional experience.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-3 mb-4">

                <div className="text-xl font-semibold tracking-tight">Surgo</div>
              </div>
              <p className="text-gray-400 text-sm">
                Surgo LLC - Institutional investment management and advisory services.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Portfolio Management</li>
                <li>Risk Assessment</li>
                <li>Investment Advisory</li>
                <li>Alternative Investments</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About Us</li>
                <li>Investment Philosophy</li>
                <li>Team</li>
                <li>Careers</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Client Services</li>
                <li>Investor Relations</li>
                <li>Media Inquiries</li>
                <li>Compliance</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Surgo LLC. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
