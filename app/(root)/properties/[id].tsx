import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity, Platform, FlatList } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import images from '@/constants/images';
import icons from '@/constants/icons';
import { useAppwrite } from '@/lib/useAppwrite';
import { getPropertyById } from '@/lib/appwrite';
import { facilities } from '@/constants/data';
import Comment from '@/components/Comment';

const Property = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const windowHeight = Dimensions.get('window').height;

  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id!,
    },
  });

  return (
    <View className=' flex flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32'>
        <View className='relative w-full' style={{ height: windowHeight / 2 }}>
          <Image source={{ uri: property?.image }} className='size-full' resizeMode='cover' />
          <Image source={images.whiteGradient} className='size-full absolute top-0 w-full z-40' />

          <View className='absolute z-50 inset-x-7' style={{ top: Platform.OS === 'ios' ? 70 : 20 }}>
            <View className='flex flex-row items-center justify-between w-full'>

              <TouchableOpacity onPress={() => { router.back() }}
                className='flex flex-row items-center bg-primary-200 rounded-full size-11 justify-center'>
                <Image source={icons.backArrow} className='size-5 ' />
              </TouchableOpacity>

              <View className='flex flex-row items-center gap-3'>
                <Image
                  source={icons.heart}
                  className="size-7"
                  tintColor={"#191D31"}
                />
                <Image
                  source={icons.send}
                  className="size-7"
                  tintColor={"#191D31"}
                />
              </View>

            </View>
          </View>
        </View>

        <View className='px-5 mt-7 flex gap-2'>
          <Text className='text-2xl font-rubik-bold text-black-300'>{property?.name}</Text>

          <View className='flex flex-row items-center gap-3'>
            <View className='flex flex-row items-center rounded-full bg-primary-100 px-4 py-1'>
              <Text className='text-xs font-rubik-bold text-primary-300'>{property?.type}</Text>
            </View>

            <View className='flex flex-row items-center gap-2'>
              <Image source={icons.star} className='size-5' />
              <Text className='text-sm font-rubik-medium text-black-200'>{property?.rating} ({property?.reviews.length})</Text>
            </View>
          </View>

          <View className='flex flex-row justify-between mt-5'>

            <View className='flex flex-row  items-center gap-2'>
              <View className='flex flex-row items-center gap-3 bg-primary-100 rounded-full size-10 justify-center '>
                <Image source={icons.bed} className='size-5' />
              </View>
              <Text className='text-sm font-rubik-medium text-black-300'> {property?.bedrooms} Beds </Text>
            </View>

            <View className='flex flex-row  items-center gap-2'>
              <View className='flex flex-row items-center gap-3 bg-primary-100 rounded-full size-10 justify-center '>
                <Image source={icons.bath} className='size-5' />
              </View>
              <Text className='text-sm font-rubik-medium text-black-300'> {property?.bathrooms} Bath </Text>
            </View>

            <View className='flex flex-row  items-center gap-2'>
              <View className='flex flex-row items-center gap-3 bg-primary-100 rounded-full size-10 justify-center '>
                <Image source={icons.area} className='size-5' />
              </View>
              <Text className='text-sm font-rubik-medium text-black-300'> {property?.area} sqft </Text>
            </View>

          </View>

          <View className='w-full mt-5 pt-7 border-t border-primary-200  '>
            <Text className='text-xl font-rubik-bold text-black-300'>Agent</Text>

            <View className='flex flex-row justify-between items-center mt-3'>
              <View className='flex flex-row items-center'>
                <Image source={{ uri: property?.agent.avatar }} className='size-14 rounded-full' />

                <View className='flex flex-col ml-3 items-start justify-center '>
                  <Text className='text-lg font-rubik-bold text-black-300'>{property?.agent.name}</Text>
                  <Text className='text-sm font-rubik-medium text-black-200'>{property?.agent.email}</Text>
                </View>
              </View>

              <View className='flex flex-row items-center gap-3'>
                <Image source={icons.chat} className='size-6' />
                <Image source={icons.phone} className='size-6' />
              </View>

            </View>
          </View>

          <View className='w-full mt-5 '>
            <Text className='text-xl font-rubik-bold text-black-300'>Overview</Text>

            <Text className='text-lg font-rubik text-black-200 mt-3'>
              {property?.description}
            </Text>
          </View>

          <View className="mt-7">
            <Text className="text-xl font-rubik-bold text-black-300">Facilities</Text>

            {property?.facilities.length > 0 && (
              <View className="flex flex-row flex-wrap justify-start mt-5">
                {property?.facilities.map((item: string, index: number) => {
                  const facility = facilities.find((facility) => facility.title === item);

                  return (
                    <View
                      key={index}
                      className="flex flex-col items-center w-[22%] mb-4"
                    >
                      <View className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full">
                        <Image
                          source={facility ? facility.icon : icons.info}
                          className="w-6 h-6"
                        />
                      </View>
                      <Text
                        className="text-sm text-center font-rubik text-black-300 mt-1.5"
                        ellipsizeMode="tail"
                        numberOfLines={1}
                      >
                        {item}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>


          {property?.gallery.length > 0 && (
            <View className="mt-7">
              <Text className="text-black-300 text-xl font-rubik-bold">
                Gallery
              </Text>
              <FlatList
                contentContainerStyle={{ paddingRight: 20 }}
                data={property?.gallery}
                keyExtractor={(item) => item.$id}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.image }}
                    className="size-40 rounded-xl"
                  />
                )}
                contentContainerClassName="flex gap-4 mt-3"
              />
            </View>
          )}

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Location
            </Text>
            <View className="flex flex-row items-center justify-start mt-4 gap-2">
              <Image source={icons.location} className="w-7 h-7" />
              <Text className="text-black-200 text-sm font-rubik-medium">
                {property?.address}
              </Text>
            </View>

            <Image
              source={images.map}
              className="h-52 w-full mt-5 rounded-xl"
            />
          </View>

          {property?.reviews.length > 0 && (
            <View className="mt-7">
              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center">
                  <Image source={icons.star} className="size-6" />
                  <Text className="text-black-300 text-xl font-rubik-bold ml-2">
                    {property?.rating} ({property?.reviews.length} reviews)
                  </Text>
                </View>

                <TouchableOpacity>
                  <Text className="text-primary-300 text-base font-rubik-bold">
                    View All
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mt-5">
                <Comment item={property?.reviews[0]} />
              </View>
            </View>
          )}
        </View>

      </ScrollView>

      <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 p-7">
        <View className="flex flex-row items-center justify-between gap-10">
          <View className="flex flex-col items-start">
            <Text className="text-black-200 text-xs font-rubik-medium">
              Price
            </Text>
            <Text
              numberOfLines={1}
              className="text-primary-300 text-start text-2xl font-rubik-bold"
            >
              ${property?.price}
            </Text>
          </View>

          <TouchableOpacity className="flex-1 flex flex-row items-center justify-center bg-primary-300 py-3 rounded-full shadow-md shadow-zinc-400">
            <Text className="text-white text-lg text-center font-rubik-bold">
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Property