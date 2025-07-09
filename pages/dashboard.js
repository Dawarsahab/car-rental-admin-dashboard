import { useState } from 'react';
import AuthGuard from '@/components/AuthGuard';
import ListingTable from '@/components/ListingTable';
import StatusFilter from '@/components/StatusFilter';
import Pagination from '@/components/Pagination';
import { useNotification } from '@/context/NotificationContext';
import { getListings } from '@/lib/api';

export const getServerSideProps = async (ctx) => {
  const initialListings = [
    { 
      id: 1, 
      make: 'Toyota', 
      model: 'Camry', 
      year: 2020, 
      status: 'pending', 
      pricePerDay: 45,
      submittedBy: 'user1' 
    },
    { 
      id: 2, 
      make: 'Honda', 
      model: 'Civic', 
      year: 2019, 
      status: 'approved', 
      pricePerDay: 40,
      submittedBy: 'user2' 
    },
    { 
      id: 3, 
      make: 'Ford', 
      model: 'Mustang', 
      year: 2021, 
      status: 'rejected', 
      pricePerDay: 75,
      submittedBy: 'user3' 
    },
    { 
      id: 4, 
      make: 'BMW', 
      model: 'X5', 
      year: 2022, 
      status: 'pending', 
      pricePerDay: 120,
      submittedBy: 'user4' 
    },
    { 
      id: 5, 
      make: 'Tesla', 
      model: 'Model 3', 
      year: 2023, 
      status: 'approved', 
      pricePerDay: 90,
      submittedBy: 'user5' 
    },
    { 
      id: 6, 
      make: 'Audi', 
      model: 'A4', 
      year: 2021, 
      status: 'pending', 
      pricePerDay: 65,
      submittedBy: 'user6' 
    },
    { 
      id: 7, 
      make: 'Mercedes', 
      model: 'C-Class', 
      year: 2022, 
      status: 'approved', 
      pricePerDay: 85,
      submittedBy: 'user7' 
    },
    { 
      id: 8, 
      make: 'Hyundai', 
      model: 'Elantra', 
      year: 2020, 
      status: 'rejected', 
      pricePerDay: 35,
      submittedBy: 'user8' 
    },
    { 
      id: 9, 
      make: 'Kia', 
      model: 'Sorento', 
      year: 2021, 
      status: 'pending', 
      pricePerDay: 55,
      submittedBy: 'user9' 
    },
    { 
      id: 10, 
      make: 'Subaru', 
      model: 'Outback', 
      year: 2022, 
      status: 'approved', 
      pricePerDay: 60,
      submittedBy: 'user10' 
    }
  ];

  return { props: { initialListings } };
};

export default function Dashboard({ initialListings }) {
  const [listings, setListings] = useState(initialListings);
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { showNotification } = useNotification();

  const filteredListings = statusFilter
    ? listings.filter(listing => listing.status === statusFilter)
    : listings;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedListings = filteredListings.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);

  const handleStatusChange = async (id, status) => {
    try {
      setListings(listings.map(l => 
        l.id === id ? { ...l, status } : l
      ));
      showNotification(`Listing ${status} successfully`);
    } catch (error) {
      showNotification('Failed to update status', 'error');
      console.error('Status update error:', error);
    }
  };

  const handleEdit = async (updatedListing) => {
    try {
      setListings(listings.map(l => 
        l.id === updatedListing.id ? updatedListing : l
      ));
      showNotification('Listing updated successfully');
    } catch (error) {
      showNotification('Failed to update listing', 'error');
      console.error('Edit error:', error);
    }
  };

  return (
    <AuthGuard>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Car Rental Listings</h1>
          <StatusFilter 
            value={statusFilter} 
            onChange={setStatusFilter} 
          />
        </div>

        <ListingTable 
          listings={paginatedListings}
          onEdit={handleEdit}
          onStatusChange={handleStatusChange}
        />

        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </AuthGuard>
  );
}