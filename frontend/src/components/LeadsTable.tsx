import type { Lead } from "../types/lead";

interface Props {
    leads: Lead[];
    onDelete: (id: string) => void;
    userRole?: string;
}

const LeadsTable = ({ leads, onDelete, userRole }: Props) => {
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left p-4">
                            Name
                        </th>

                        <th className="text-left p-4">
                            Email
                        </th>

                        <th className="text-left p-4">
                            Status
                        </th>

                        <th className="text-left p-4">
                            Source
                        </th>

                        <th className="text-left p-4">
                            Created
                        </th>

                        <th className="text-left p-4">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {leads.map((lead) => (
                        <tr
                            key={lead._id}
                            className="border-t"
                        >
                            <td className="p-4">
                                {lead.name}
                            </td>

                            <td className="p-4">
                                {lead.email}
                            </td>

                            <td className="p-4 capitalize">
                                {lead.status}
                            </td>

                            <td className="p-4 capitalize">
                                {lead.source}
                            </td>

                            <td className="p-4">
                                {new Date(
                                    lead.createdAt
                                ).toLocaleDateString()}
                            </td>

                            <td className="p-4">
                                {userRole === "admin" && (
                                    <button
                                        onClick={() => onDelete(lead._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeadsTable;