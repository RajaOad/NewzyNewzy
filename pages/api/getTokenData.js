export default function handler(req, res) {
    const { token } = req.query;
    // Perform any necessary validation or processing with the token
    // Retrieve the data you need for getServerSideProps
    const data = { exampleData: 'Example data from the server' };
    res.status(200).json(data);
  }
  