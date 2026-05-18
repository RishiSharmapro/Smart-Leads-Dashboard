import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import LeadsTable from "../components/LeadsTable";
import type { Lead } from "../types/lead";
import useDebounce from "../hooks/useDebounce";
import CreateLeadForm from "../components/CreateLeadForm";
import { CSVLink } from "react-csv";

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [source, setSource] = useState("");
    const [sort, setSort] = useState("latest");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const debouncedSearch = useDebounce(search, 500);

    const handleDelete = async (
        id: string
    ) => {
        try {
            await api.delete(`/leads/${id}`);

            fetchLeads();
        } catch (error) {
            console.error(error);
        }
    };

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const response = await api.get(
                "/leads",
                {
                    params: {
                        search: debouncedSearch,
                        status,
                        source,
                        sort,
                        page,
                    },
                }
            );

            setLeads(response.data.leads);
            setTotalPages(response.data.pagination.pages);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch, status, source, sort, page]);


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">
                        Smart Leads Dashboard
                    </h1>

                    <p className="text-gray-600">
                        Welcome, {user?.name}
                    </p>
                </div>

                <div className="flex space-x-4">
                    <button
                        onClick={logout}
                        className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                    >
                        Logout
                    </button>
                    <CSVLink
                        data={leads}
                        filename="leads.csv"
                        className="bg-green-500 text-white px-4 py-2 rounded mr-4 cursor-pointer"
                    >
                        Export CSV
                    </CSVLink>
                </div>
            </div>

            <CreateLeadForm onLeadCreated={fetchLeads} />

            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Search name or email..."
                        className="border p-3 rounded"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    <select
                        className="border p-3 rounded"
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                    >
                        <option value="">
                            All Status
                        </option>

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
                        className="border p-3 rounded"
                        value={source}
                        onChange={(e) =>
                            setSource(e.target.value)
                        }
                    >
                        <option value="">
                            All Sources
                        </option>

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

                    <select
                        className="border p-3 rounded"
                        value={sort}
                        onChange={(e) =>
                            setSort(e.target.value)
                        }
                    >
                        <option value="latest">
                            Latest
                        </option>

                        <option value="oldest">
                            Oldest
                        </option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : leads.length === 0 ? (
                <div className="bg-white p-10 rounded-lg text-center">
                    No leads found
                </div>
            ) : (
                <LeadsTable leads={leads} onDelete={handleDelete} userRole={user?.role} />
            )}

            <div className="flex justify-center items-center gap-4 mt-6">
                <button
                    disabled={page === 1}
                    onClick={() =>
                        setPage((prev) => prev - 1)
                    }
                    className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Previous
                </button>

                <span>
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() =>
                        setPage((prev) => prev + 1)
                    }
                    className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;