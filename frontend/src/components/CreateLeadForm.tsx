import { useState } from "react";
import api from "../services/api";

interface Props {
    onLeadCreated: () => void;
}

const CreateLeadForm = ({
    onLeadCreated,
}: Props) => {
    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            status: "new",
            source: "website",
        });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        await api.post("/leads", formData);

        setFormData({
            name: "",
            email: "",
            status: "new",
            source: "website",
        });

        onLeadCreated();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-lg shadow mb-6"
        >
            <h2 className="text-xl font-bold mb-4">
                Create Lead
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="border p-3 rounded"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border p-3 rounded"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <select
                    name="status"
                    className="border p-3 rounded"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="new">
                        New
                    </option>

                    <option value="contacted">
                        Contacted
                    </option>

                    <option value="qualified">
                        Qualified
                    </option>

                    <option value="lost">
                        Lost
                    </option>
                </select>

                <select
                    name="source"
                    className="border p-3 rounded"
                    value={formData.source}
                    onChange={handleChange}
                >
                    <option value="website">
                        Website
                    </option>

                    <option value="instagram">
                        Instagram
                    </option>

                    <option value="referral">
                        Referral
                    </option>
                </select>
            </div>

            <button className="mt-4 bg-black text-white px-6 py-2 rounded mx-auto block cursor-pointer">
                Create Lead
            </button>
        </form>
    );
};

export default CreateLeadForm;