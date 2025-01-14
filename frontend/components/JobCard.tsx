import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

import Company from '../assets/images/company.png';
import Crown from '../assets/images/featured.png';
import Bookmark from '../assets/images/bookmark.png';
import Sync from '../assets/images/sync.png';

const JobCard = ({ Job }) => {
  return (
    <View style={tw`h-full w-full bg-violet-700 rounded-xl p-4`}>
      <View style={tw`flex-row justify-between items-center`}>
        <View style={tw`flex-row items-center`}>
          <View
            style={tw`bg-violet-500 flex items-center justify-center h-16 w-16 rounded-full overflow-hidden`}
          >
            <Image source={Company} style={tw`w-full h-full`} resizeMode="cover" />
          </View>
          <View style={tw`ml-2`}>
            <Text style={tw`text-white font-bold text-3xl`}>{Job.title}</Text>
            <Text style={tw`text-white`}>{Job.location}</Text>
          </View>
        </View>

        <View
          style={tw`bg-violet-500 flex-row items-center justify-center rounded-full overflow-hidden p-4 ml-2`}
        >
          <Image source={Crown} resizeMode="cover" />
          <Text style={tw`text-white font-bold ml-2`}>
            {Job.featured ? 'Featured' : 'Not Featured'}
          </Text>
        </View>
      </View>

      <Text style={tw`text-white font-bold text-2xl`}>{`Rs. ${Job.salary}/day`}</Text>

      <View style={tw`flex-row justify-between items-center`}>
        <View style={tw`flex-row`}>
          <TouchableOpacity>
            <View
              style={tw`bg-violet-500 flex justify-center items-center h-16 w-16 rounded-full overflow-hidden`}
            >
              <Image source={Bookmark} resizeMode="cover" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View
              style={tw`bg-violet-500 flex items-center justify-center h-16 w-16 rounded-full overflow-hidden`}
            >
              <Image source={Sync} resizeMode="cover" />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={tw`bg-white py-3 px-6 rounded-full mb-4`}
          onPress={() => {}}
        >
          <Text style={tw`text-violet-700 text-lg font-bold`}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JobCard;
