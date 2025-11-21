import React from 'react'
import { Link } from 'react-router-dom'

const Table = ({links}) => {
    return (
    <table className="w-full border-collapse text-center">
        <thead>
            <tr className="bg-gray-600">
                <th className="border p-2">Code</th>
                <th className="border p-2">URL</th>
                <th className="border p-2 hidden md:table-cell">Clicks</th>
                <th className="border p-2 hidden md:table-cell">Last Clicked</th>
                <th className="border p-2">Actions</th>
            </tr>
        </thead>

        <tbody>
            {links.map((l) => (
            <tr key={l.code}>
                <td className="border p-2">{l.code}</td>
                <td className="border p-2 wrap-anywhere">{l.url}</td>
                <td className="border p-2 hidden md:table-cell">{l.clicks}</td>
                <td className="border p-2 hidden md:table-cell">{l.lastClicked ? new Date(l.lastClicked).toLocaleString() : "-"}</td>
                <td className="border p-2">
                    <Link
                        to={`/code/${l.code}`}
                        className="text-blue-600 underline"
                    >
                    Stats
                    </Link>
                </td>
            </tr>
            ))}
        </tbody>
    </table>
    )
}

export default Table