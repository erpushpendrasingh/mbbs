import {
  Box,
  Button,
  Flex,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { FcOpenedFolder } from "react-icons/fc";
import axios from "axios";
import { AiTwotoneDelete } from "react-icons/ai";
const AdminPanel = ({ colleges, setColleges }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");

  const handleSizeClick = (newSize) => {
    setSize(newSize);
    onOpen();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/colleges/${id}`);
      setColleges(colleges.filter((college) => college._id !== id));
    } catch (error) {
      console.error("Failed to delete college:", error);
    }
  };
  console.log("colleges:", colleges);
  return (
    <Box
      w="100%"
      p="50px"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      margin="10px auto"
    >
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>
            <Text>Prev</Text>
            <Text>Next</Text>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>College Name</Th>
              <Th>City</Th>
              <Th>State</Th>
              <Th>Course</Th>
              <Th>Cut Off</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {colleges?.map((items) => (
              <Tr key={items._id}>
                <Td>{items.name}</Td>
                <Td>{items.city}</Td>
                <Td>{items.state}</Td>
                {items?.courses.map((course) => {
                  return (
                    <Td>
                      <Flex
                        direction={"column"}
                        align={"center"}
                        justify={"center"}
                      >
                        <UnorderedList>
                          <ListItem>{`Branch - ${course.Branch}`}</ListItem>
                          <ListItem>{`Course - ${course.Course}`}</ListItem>
                          <ListItem>{`Course Duration - ${course.CourseDuration}`}</ListItem>
                          <ListItem>{`Total Seat - ${course.TotalSeat}`}</ListItem>
                          <ListItem>{`Tution Fee - ${course.TutionFee}`}</ListItem>
                        </UnorderedList>
                      </Flex>
                    </Td>
                  );
                })}
                {/* <Td>
                  <ul>
                    <li>{`Branch - ${items.courses.Branch}`}</li>
                    <li>{`Course - ${items.courses.Course}`}</li>
                    <li>{`Course Duration - ${items.courses.CourseDuration}`}</li>
                    <li>{`Total Seat - ${items.courses.TotalSeat}`}</li>
                    <li>{`Tution Fee - ${items.courses.TutionFee}`}</li>
                  </ul>
                </Td> */}
                <Td>
                  <FcOpenedFolder
                    size={"50px"}
                    cursor={"pointer"}
                    onClick={() => handleSizeClick(items._id)}
                  />
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(items._id)}
                  >
                    <AiTwotoneDelete />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal onClose={onClose} isOpen={isOpen} size={"xxl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="striped" colorScheme="teal">
                <TableCaption>
                  <Text>Prev</Text>
                  <Text>Next</Text>
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Seat Type</Th>
                    <Th>Counselling Type</Th>
                    <Th>Category</Th>
                    <Th>Sub Category</Th>
                    <Th>Domicile Condition</Th>
                    <Th>Round-1 Rank</Th>
                    <Th>Round-2 Rank</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {colleges?.map((items) => {
                    return items?.cutOffs?.map((item) => (
                      <Tr key={item._id}>
                        <Td>{item.seatType}</Td>
                        <Td>{item.counsellingType}</Td>
                        <Td>{item.category}</Td>
                        <Td>{item.subCategory}</Td>
                        <Td>{item.domicileCondition}</Td>
                        <Td>{item.round1Rank}</Td>
                        <Td>{item.round2Rank}</Td>
                      </Tr>
                    ));
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminPanel;
/** i have to write code to make an api which creates city wise clousre the thing is in this there is 3 select methods, course,city,Category with options and a submit button when user click on button submit the value of selected things in the select box that make a request by which we can get the college of with this match of course city category */

// import {
//   Box,
//   Button,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
//   Text,
//   useDisclosure,
// } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";

// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   TableContainer,
// } from "@chakra-ui/react";
// import axios from "axios";
// import { FcOpenedFolder } from "react-icons/fc";

// const AdminPanel = () => {
//   const [showInput,setShowInput]=useState()
//   const [colleges, setColleges] = useState([]);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [size, setSize] = React.useState("md");

//   const handleSizeClick = (newSize) => {
//     setSize(newSize);
//     onOpen();
//   };

//   const getCollegesData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8000/api/colleges`);
//       const data = response.data;
//       setColleges(data);
//     } catch (error) {
//       console.log("error:", error);
//     }
//   };
//   useEffect(() => {
//     if (colleges.length <= 0) {
//       getCollegesData();
//     }
//   }, [colleges.length]);
//   console.log("colleges:", colleges);
//   return (
//     <Box
//       w="90%"
//       p="50px"
//       boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
//       margin="10px auto"
//     >
//       <TableContainer>
//         <Table variant="striped" colorScheme="teal">
//           <TableCaption>
//             <Text>Prev</Text>
//             <Text>Next</Text>
//           </TableCaption>
//           <Thead>
//             <Tr>
//               <Th>College Name</Th>
//               <Th>City</Th>
//               <Th>State</Th>
//               <Th>Course</Th>
//               <Th>Cut Off</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {colleges?.map((items) => (
//               <Tr>
//                 <Td>{items.name}</Td>
//                 <Td>{items.city}</Td>
//                 <Td>{items.state}</Td>
//                 <Td>
//                   <ul>
//                     <li>{`Branch - ${items.courses.Branch}`}</li>
//                     <li>{`Course - ${items.courses.Course}`}</li>
//                     <li>{`Course Duration - ${items.courses.CourseDuration}`}</li>
//                     <li>{`Total Seat - ${items.courses.TotalSeat}`}</li>
//                     <li>{`Tution Fee - ${items.courses.TutionFee}`}</li>
//                   </ul>
//                 </Td>
//                 <Td>
//                   <FcOpenedFolder
//                     size={"50px"}
//                     cursor={"pointer"}
//                     onClick={handleSizeClick}
//                   />
//                 </Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       </TableContainer>
//       <Modal onClose={onClose} isOpen={isOpen}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Modal Title</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <TableContainer>
//               <Table variant="striped" colorScheme="teal">
//                 <TableCaption>
//                   <Text>Prev</Text>
//                   <Text>Next</Text>
//                 </TableCaption>
//                 <Thead>
//                   <Tr>
//                     <Th>Seat Type</Th>
//                     <Th>Counselling Type</Th>
//                     <Th>Category</Th>
//                     <Th>Sub Category</Th>
//                     <Th>Domicile Condition</Th>
//                     <Th>Round-1 Rank</Th>
//                     <Th>Round-2 Rank</Th>
//                   </Tr>
//                 </Thead>
//                 <Tbody>
//                   {colleges?.map((items) => {
//                     return items?.cutOffs?.map((item) => (
//                       <Tr>
//                         <Td>{item.seatType}</Td>
//                         <Td>{item.counsellingType}</Td>
//                         <Td>{item.category}</Td>
//                         <Td>{item.subCategory}</Td>
//                         <Td>{item.domicileCondition}</Td>
//                         <Td>{item.round1Rank}</Td>
//                         <Td>{item.round2Rank}</Td>
//                       </Tr>
//                     ));
//                   })}
//                 </Tbody>
//               </Table>
//             </TableContainer>
//           </ModalBody>
//           <ModalFooter>
//             <Button onClick={onClose}>Close</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default AdminPanel;
