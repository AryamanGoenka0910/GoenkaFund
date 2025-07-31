"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle } from "lucide-react"
import { useState } from "react"

interface AddSecurityDialogProps {
  onSecurityAdded: () => void
}

export function AddSecurityDialog({ onSecurityAdded }: AddSecurityDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    symbol: "",
    name: "",
    type: "",
    quantity: "",
    purchasePrice: "",
    purchaseDate: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/positions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          quantity: Number.parseFloat(formData.quantity),
          purchasePrice: Number.parseFloat(formData.purchasePrice),
          currentPrice: Number.parseFloat(formData.purchasePrice), // Initial current price
        }),
      })

      if (response.ok) {
        setFormData({
          symbol: "",
          name: "",
          type: "",
          quantity: "",
          purchasePrice: "",
          purchaseDate: "",
        })
        setOpen(false)
        onSecurityAdded()
      }
    } catch (error) {
      console.error("Error adding security:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <PlusCircle className="h-4 w-4" />
          Add Position
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Add New Position</DialogTitle>
          <DialogDescription className="text-gray-600">Add a new security position to the portfolio.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="symbol" className="text-gray-700">
                Symbol
              </Label>
              <Input
                id="symbol"
                value={formData.symbol}
                onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                className="border-gray-300"
                placeholder="e.g., AAPL"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type" className="text-gray-700">
                Type
              </Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stock">Stock</SelectItem>
                  <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  <SelectItem value="bond">Bond</SelectItem>
                  <SelectItem value="etf">ETF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700">
              Company Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-gray-300"
              placeholder="e.g., Apple Inc."
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-gray-700">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                step="0.00000001"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="border-gray-300"
                placeholder="100"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purchasePrice" className="text-gray-700">
                Purchase Price
              </Label>
              <Input
                id="purchasePrice"
                type="number"
                step="0.01"
                value={formData.purchasePrice}
                onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                className="border-gray-300"
                placeholder="150.00"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="purchaseDate" className="text-gray-700">
              Purchase Date
            </Label>
            <Input
              id="purchaseDate"
              type="date"
              value={formData.purchaseDate}
              onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
              className="border-gray-300"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Add Position
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
