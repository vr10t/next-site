
export default function handler(req, res) {
  // Get data submitted in request's body.
  // const router =useRouter()
  const body = req.body

  

  // Found the name.
  // Sends a HTTP success code
  res.status(200).json({ data: `${body.location}  ${body.destination} ${body.passengers} ${body.date} ${body.time}` })
  
}