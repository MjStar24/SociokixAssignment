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

import Featured from '../../assets/images/featured.png';
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
          <Image source={Featured} style={tw`w-full h-full`} resizeMode="cover" />
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
