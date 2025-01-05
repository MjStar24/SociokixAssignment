// import { Text, View , Image, StyleSheet, TextInput ,ScrollView, SafeAreaView, StatusBar, TouchableOpacity, Platform } from 'react-native';
// import { useState,useEffect } from 'react';
// import MotiView from "moti"
// import tw from 'twrnc';

// import JobCard from '@/components/JobCard';

// // const Love = require('../../assets/images/love.jpg');
// // const Notifiaction=require('../../assets/images/noti.png');
// // const DownwardArrow=require('../../assets/images/downwardArrow.png');
// // const Filter=require('../../assets/images/filter.png')
// // const Search=require('../../assets/images/search.png')

// import Love from '../../assets/images/love.jpg';
// import Notification from '../../assets/images/noti.png';
// import DownwardArrow from '../../assets/images/downwardArrow.png';
// import Filter from '../../assets/images/filter.png';
// import Search from '../../assets/images/search.png';

// export default function HomeScreen() {

  

//   const [categories,setCategories]=useState([])
//   const [jobs,setJobs]=useState([]);
//   const [loadingCategories, setLoadingCategories] = useState(true);
//   const [loadingJobs, setLoadingJobs] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState(null);


//   useEffect(()=>{
//     const fetchCategories=async ()=>{
//       try{

//         const response = await fetch("http://localhost:4000/api/categories/"); 
//         if (!response.ok) throw new Error("Failed to fetch categories");
//         const data = await response.json();
//         console.log(data);
//         setCategories(data); 
//       }catch(e){
//         console.log(e,"Error in finding categories");
//       }finally{
//         setLoadingCategories(false);
//       }
//     }

    

//     fetchCategories();
    
//   },[])

//   const fetchJobs = async (categoryName:String) => {
//     try {
//       setLoadingJobs(true);
  
//       const response = await fetch(`http://localhost:4000/api/jobs/featured?category=${encodeURIComponent(categoryName)}`);
  
//       if (!response.ok) {
//         throw new Error("Failed to fetch jobs");
//       }
  
//       const data = await response.json();
//       setJobs(data);
//       console.log(data);
//     } catch (error) {
//       console.log("Error fetching jobs:", error);
//     } finally {
//       setLoadingJobs(false);
//     }
//   };
  

//   const handleCategorySelect=(category:{id:Number,name:String})=>{
//     setSelectedCategory(category.id);
//     fetchJobs(category.name);
//     }

//   const renderSkeleton = (width, height, borderRadius, count = 1) => {
//     return Array.from({ length: count }).map((_, index) => (
//       <MotiView
//         key={index}
//         testID="loading-skeleton"
//         style={{
//           width,
//           height,
//           borderRadius,
//           backgroundColor: '#444',
//           marginHorizontal: 6,
//         }}
//         from={{ opacity: 0.3 }}
//         animate={{ opacity: 1 }}
//         transition={{
//           type: 'timing',
//           duration: 800,
//           loop: true,
//         }}
//       />
//     ));
//   };
  
//   return (
    
//   <SafeAreaView style={{ flex: 1, backgroundColor: '#000' , paddingTop:Platform.OS=="android"?25:0 }}>
//   <StatusBar
//     barStyle="light-content" 
//     backgroundColor="#000" 
//   />
//     <View className="flex flex-row justify-between p-2">
      
//       <View className="h-20 w-20 rounded-full overflow-hidden">
//         <Image source={Love} className="w-full h-full" resizeMode="cover" />
//       </View>

//       <TouchableOpacity>
//         <View className="flex flex-row border-4 border-white rounded-full items-center p-2">
//           <Text className='text-white text-2xl'>Hyderabad</Text>
//           <Image source={DownwardArrow} className="h-full" resizeMode="cover" />
//         </View>
//       </TouchableOpacity>
      
//       <View className="flex justify-center border-2 border-white items-center h-16 w-16 rounded-full overflow-hidden">
//           <Image source={Notifiaction} className="w-9/12 h-9/12" resizeMode="cover" />
//         </View>
//     </View>
//     <View className='my-4 p-2'>
//       <Text className='text-white text-2xl'>
//         Welcome back
//       </Text>
//       <Text className='text-white text-3xl font-bold'>
//         MjStar
//       </Text>
//     </View>
//     <View className="flex flex-row items-center p-2">
//       <View className="flex-1 flex-row items-center p-2  bg-gray-800 rounded-full">
//         <Image source={Search}></Image>
//         <TextInput
//           className="flex-1  bg-gray-800 rounded-full text-white px-4"
//           placeholder="Search by role, project, or location"
//           placeholderTextColor="gray"
//         />
        
//       </View>
//       <Image source={Filter} className="h-8 w-8 ml-2" resizeMode="contain" />
//     </View>

//     <View>
//     <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{
//           flexDirection: 'row',
//           justifyContent: 'center',
//           alignItems: 'center',
//           gap: 12,
//         }}
//         className="mt-6 p-2"
//       >
//        {/* {categories.map((el, index) => (
//           <View
//             key={index}
//             className="bg-violet-700 px-4 py-2 rounded-full items-center"
//           >
//             <Text className="text-white">{"hello"}</Text>
//           </View>
//        ))} */}

//           {loadingCategories
//             ? renderSkeleton(80, 40, 20, 5)
//             : categories.map((category, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   onPress={() => handleCategorySelect(category)}
//                 >
//                   <View
//                     className={`px-4 py-2 rounded-full items-center ${
//                       selectedCategory === category.id ? 'bg-violet-700' : 'bg-gray-800'
//                     }`}
//                   >
//                     <Text className="text-white">{category.name}</Text>
//                   </View>
//                 </TouchableOpacity>
//               ))}

      


//       </ScrollView>
//     </View>

//     <View className='flex-row justify-between p-4'>
//       <Text className='text-white font-bold'>Featured Jobs</Text>
//       <Text className='text-white'>Last Upadted: 2 hours ago</Text>
//     </View>


//     <View className='h-2/6'>
//     <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{
//           flexDirection: 'row',
//           justifyContent: 'center',
//           alignItems: 'center',
//           gap: 12,
//         }}
//         className="mt-6 p-2"
//       >
//         {/* {jobs.map((el, index) => (
//           <View key={index} className=''>
//             <FoodCard/>
//           </View>
//         ))} */}

//         {loadingJobs
//             ? renderSkeleton(200, 150, 8, 3)
//             : jobs.map((job, index) => (
//                 <View key={index}>
//                   <JobCard Job={job}/>
//                 </View>
//               ))}


        

//       </ScrollView>
//     </View>
 

//     </SafeAreaView>

  
   
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });


import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useState, useEffect } from 'react';
import { View as MotiView } from 'moti';
import tw from 'twrnc';

import JobCard from '@/components/JobCard';

import Love from '../../assets/images/love.jpg';
import Notification from '../../assets/images/noti.png';
import DownwardArrow from '../../assets/images/downwardArrow.png';
import Filter from '../../assets/images/filter.png';
import Search from '../../assets/images/search.png';

export default function HomeScreen() {
  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/categories/');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (e) {
        console.error(e, 'Error in finding categories');
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const fetchJobs = async (categoryName) => {
    try {
      setLoadingJobs(true);

      const response = await fetch(
        `http://localhost:4000/api/jobs/featured?category=${encodeURIComponent(
          categoryName
        )}`
      );

      if (!response.ok) throw new Error('Failed to fetch jobs');

      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoadingJobs(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id);
    fetchJobs(category.name);
  };

  const renderSkeleton = (width, height, borderRadius, count = 1) => {
    return Array.from({ length: count }).map((_, index) => (
      <MotiView
        key={index}
        testID="loading-skeleton"
        style={{
          width,
          height,
          borderRadius,
          backgroundColor: '#444',
          marginHorizontal: 6,
        }}
        from={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{
          type: 'timing',
          duration: 800,
          loop: true,
        }}
      />
    ));
  };

  return (
    <SafeAreaView
      style={tw`flex-1 bg-black pt-${Platform.OS === 'android' ? 6 : 0}`}
    >
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={tw`flex-row justify-between p-2`}>
        <View style={tw`h-20 w-20 rounded-full overflow-hidden`}>
          <Image source={Love} style={tw`w-full h-full`} resizeMode="cover" />
        </View>

        <TouchableOpacity>
          <View
            style={tw`flex-row border-4 border-white rounded-full items-center p-2`}
          >
            <Text style={tw`text-white text-2xl`}>Hyderabad</Text>
            <Image source={DownwardArrow} resizeMode="cover" />
          </View>
        </TouchableOpacity>

        <View
          style={tw`justify-center border-2 border-white items-center h-16 w-16 rounded-full overflow-hidden`}
        >
          <Image
            source={Notification}
            style={tw`w-9/12 h-9/12`}
            resizeMode="cover"
          />
        </View>
      </View>
      <View style={tw`my-4 p-2`}>
        <Text style={tw`text-white text-2xl`}>Welcome back</Text>
        <Text style={tw`text-white text-3xl font-bold`}>MjStar</Text>
      </View>
      <View style={tw`flex-row items-center p-2`}>
        <View style={tw`flex-1 flex-row items-center p-2 bg-gray-800 rounded-full`}>
          <Image source={Search} />
          <TextInput
            style={tw`flex-1 bg-gray-800 rounded-full text-white px-4`}
            placeholder="Search by role, project, or location"
            placeholderTextColor="gray"
          />
        </View>
        <Image source={Filter} style={tw`h-8 w-8 ml-2`} resizeMode="contain" />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`flex-row justify-center items-center gap-3 mt-6 p-2`}
      >
        {loadingCategories
          ? renderSkeleton(80, 40, 20, 5)
          : categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleCategorySelect(category)}
              >
                <View
                  style={tw`px-4 py-2 rounded-full items-center ${
                    selectedCategory === category.id
                      ? 'bg-violet-700'
                      : 'bg-gray-800'
                  }`}
                >
                  <Text style={tw`text-white`}>{category.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
      </ScrollView>

      <View style={tw`flex-row justify-between p-4`}>
        <Text style={tw`text-white font-bold`}>Featured Jobs</Text>
        <Text style={tw`text-white`}>Last Updated: 2 hours ago</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`flex-row justify-center items-center gap-3 mt-6 p-2`}
      >
        {loadingJobs
          ? renderSkeleton(200, 150, 8, 3)
          : jobs.map((job, index) => (
              <View key={index}>
                <JobCard Job={job} />
              </View>
            ))}
      </ScrollView>
    </SafeAreaView>
  );
}
