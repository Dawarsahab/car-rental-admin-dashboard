import { useState } from 'react';
import { FiEdit, FiCheck, FiX, FiClock, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import EditModal from './EditModal';

const ListingTable = ({ listings, onStatusChange, onEdit }) => {
  const [editingListing, setEditingListing] = useState(null);

  const handleStatusChange = (id, status) => {
    onStatusChange(id, status);
  };

  const handleEditClick = (listing) => {
    setEditingListing(listing);
  };

  const handleSave = (updatedListing) => {
    onEdit(updatedListing);
    setEditingListing(null);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        icon: <FiClock className="mr-1" />,
        label: 'Pending'
      },
      approved: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        icon: <FiCheckCircle className="mr-1" />,
        label: 'Approved'
      },
      rejected: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        icon: <FiAlertCircle className="mr-1" />,
        label: 'Rejected'
      }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
              ID
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Make & Model
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Year
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Price/Day ($)
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Status
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Submitted By
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {listings.map((listing) => (
            <tr key={listing.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {listing.id}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="font-medium text-gray-900">{listing.make}</div>
                <div className="text-gray-500">{listing.model}</div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {listing.year}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                ${listing.pricePerDay}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                {getStatusBadge(listing.status)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {listing.submittedBy || 'N/A'}
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <div className="flex items-center justify-end space-x-3">
                  {listing.status !== 'approved' && (
                    <button
                      onClick={() => handleStatusChange(listing.id, 'approved')}
                      className="text-green-600 hover:text-green-900 flex items-center"
                      title="Approve"
                    >
                      <FiCheck className="mr-1" /> Approve
                    </button>
                  )}
                  {listing.status !== 'rejected' && (
                    <button
                      onClick={() => handleStatusChange(listing.id, 'rejected')}
                      className="text-red-600 hover:text-red-900 flex items-center"
                      title="Reject"
                    >
                      <FiX className="mr-1" /> Reject
                    </button>
                  )}
                  <button
                    onClick={() => handleEditClick(listing)}
                    className="text-indigo-600 hover:text-indigo-900 flex items-center"
                    title="Edit"
                  >
                    <FiEdit className="mr-1" /> Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {editingListing && (
        <EditModal
          listing={editingListing}
          onClose={() => setEditingListing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ListingTable;