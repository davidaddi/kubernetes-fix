import { useState, useEffect } from "react";
import "./App.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ key: "", value: "", description: "" });
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.API_URL || 'http://localhost:3000';

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Erreur :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddData = async (e) => {
    e.preventDefault();

    if (form.key.trim() && form.value.trim() && form.description.trim()) {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            key: form.key,
            value: form.value,
            description: form.description,
          }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de l'ajout des données");
        }

        const newItem = await response.json();
        setData((prevData) => [newItem, ...prevData]);
        setForm({ key: "", value: "", description: "" });
      } catch (error) {
        console.error("Erreur :", error);
      }
    } else {
      alert("Veuillez remplir tous les champs !");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1 className="text-center text-2xl font-bold mb-1">Projet Kubernetes</h1>
      <span className="text-center text-md font-semibold text-gray-500">WebApp connectée au Pod MySQL</span>

      <form onSubmit={handleAddData} className="flex flex-col items-center gap-6 my-10">
        <div className="w-full max-w-md">
          <Label htmlFor="key" className="block text-sm font-medium mb-2">Clé</Label>
          <Input type="text" id="key" name="key" value={form.key} onChange={(e) => setForm({ ...form, key: e.target.value })}
            placeholder="Entrez une clé"
            required
          />
        </div>
        <div className="w-full max-w-md">
          <Label htmlFor="value" className="block text-sm font-medium mb-2">Valeur</Label>
          <Input type="text"  id="value"  name="value" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })}
            placeholder="Entrez une valeur"
            required
          />
        </div>
        <div className="w-full max-w-md">
          <Label htmlFor="description" className="block text-sm font-medium mb-2">Description</Label>
          <Textarea id="description" name="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Entrez une description"
            rows="3"
            required
          />
        </div>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Ajouter</Button>
      </form>

      <div className="max-w-4xl mx-auto">
        {loading ? (
          <p className="text-center">Les données sont en chemin ...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="font-bold">ID</TableCell>
                <TableCell className="font-bold">Clé</TableCell>
                <TableCell className="font-bold">Valeur</TableCell>
                <TableCell className="font-bold">Description</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.key}</TableCell>
                    <TableCell>{item.value}</TableCell>
                    <TableCell>{item.description}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3" className="text-center">
                    Aucune donnée disponible
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default App;












