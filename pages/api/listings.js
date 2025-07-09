let listings = [
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
  }
];

let auditLog = [];

export default function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  const { page = 1, limit = 10, status } = req.query;

  let filtered = [...listings];
  if (status) {
    filtered = filtered.filter(l => l.status === status);
  }

  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  switch (method) {
    case 'GET':
      res.status(200).json({
        listings: paginated,
        total: filtered.length,
        page: parseInt(page),
        totalPages: Math.ceil(filtered.length / limit),
      });
      break;
    
    case 'PUT':
      
      const index = listings.findIndex(l => l.id === parseInt(id));
      
      if (index !== -1) {
        const updateData = req.body;
        
        listings[index] = { 
          ...listings[index], 
          ...updateData,
          pricePerDay: Number(updateData.pricePerDay) || listings[index].pricePerDay
        };
        
        auditLog.push({
          action: 'update',
          listingId: id,
          admin: 'admin@example.com',
          changes: Object.keys(updateData),
          timestamp: new Date().toISOString()
        });
        
        res.status(200).json(listings[index]);
      } else {
        res.status(404).json({ error: 'Listing not found' });
      }
      break;
    
    case 'POST':
      const { action } = req.body;
      const listingIndex = listings.findIndex(l => l.id === parseInt(id));
      
      if (listingIndex !== -1 && ['approve', 'reject'].includes(action)) {
        const newStatus = action === 'approve' ? 'approved' : 'rejected';
        listings[listingIndex].status = newStatus;
        
        auditLog.push({
          action: newStatus,
          listingId: id,
          admin: 'admin@example.com',
          timestamp: new Date().toISOString()
        });
        
        res.status(200).json(listings[listingIndex]);
      } else {
        res.status(400).json({ error: 'Invalid action or listing not found' });
      }
      break;
    
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}