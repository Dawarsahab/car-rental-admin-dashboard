let auditLog = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(auditLog);
  } else if (req.method === 'POST') {
    auditLog.push(req.body);
    res.status(201).json({ success: true });
  } else {
    res.status(405).end();
  }
}