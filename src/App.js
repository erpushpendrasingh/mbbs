import { Box, Button, Heading, Input } from "@chakra-ui/react";
import AdminPanel from "./components/AdminPanel";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [colleges, setColleges] = useState([]);

  // Fetch all colleges when the component mounts
  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/colleges");
      setColleges(response.data);
    } catch (error) {
      console.error("Failed to fetch colleges:", error);
    }
  };

  const handleAddCollege = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/scrape", {
        url,
      });
      if (response.status === 200) {
        fetchColleges();
        setUrl("");
      }
    } catch (error) {
      console.error("Failed to add college:", error);
    }
  };

  return (
    <Box>
      <Box
        p="5"
        border={"1px solid #CCCC"}
        h="50px"
        w="100%"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-around"}
        gap={5}
      >
        <Heading color="teal" w="33.33%" fontSize={"1rem"} textAlign={"center"}>
          Scrape College Data
        </Heading>
        <Input
          w="33.33%"
          placeholder="College url..."
          size="sm"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          colorScheme="teal"
          variant={"outline"}
          w="200px"
          onClick={handleAddCollege}
        >
          Add College
        </Button>
      </Box>
      <AdminPanel colleges={colleges} setColleges={setColleges} />
    </Box>
  );
}

export default App;

// import { Box, Button, Heading, Input } from "@chakra-ui/react";
// import AdminPanel from "./components/AdminPanel";
// import { useState } from "react";
// import axios from "axios";

// function App() {
//   const [url, setUrl] = useState();
//   const handleAddCollege = async () => {
//     try {
//       console.log("url:", url);
//       console.log("Clicked for adding college");
//       const response = await axios.post("http://localhost:8000/api/scrape", {
//         url: url,
//       });
//     } catch (error) {
//       console.log('error:', error)
//     }
//   };
//   return (
//     <Box>
//       <Box
//         p="5"
//         border={"1px solid #CCCC"}
//         h="50px"
//         w="100%"
//         display={"flex"}
//         alignItems={"center"}
//         justifyContent={"space-around"}
//         gap={5}
//       >
//         <Heading color="teal" w="33.33%" fontSize={"1rem"} textAlign={"center"}>
//           Scrape College Data
//         </Heading>
//         <Input
//           w="33.33%"
//           placeholder="College url..."
//           size="sm"
//           onChange={(e) => setUrl(e.target.value)}
//         />
//         <Button
//           colorScheme="teal"
//           variant={"outline"}
//           w="200px"
//           onClick={handleAddCollege}
//         >
//           Add College
//         </Button>
//       </Box>
//       <AdminPanel />
//     </Box>
//   );
// }

// export default App;
