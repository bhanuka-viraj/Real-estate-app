import { View, ScrollView, Image, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import icons from '@/constants/icons';
import { login } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import { Redirect } from 'expo-router';

const SignIn = () => {

  const { refetch, loading, isLoggedIn, user } = useGlobalContext();


  if (!loading && isLoggedIn) {
    return<Redirect href={"/"} />
  }

  const handleLogin = async () => {
    const result = await login();

    if (result) {
      refetch();
    } else {
      Alert.alert('Error', 'Failed to login');
    }
  };


  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView contentContainerClassName='h-full'>
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        <View className='px-10'>
          <Text className='text-base text-center font-rubik uppercase text-black-200'>Welcome to restate</Text>

          <Text className='text-3xl font-rubik-bold text-black-300 text-center mt-2'>Let's get you closer to {"\n"}
            <Text className='text-primary-300'>Your ideal home</Text>
          </Text>

          <Text className='text-lg font-rubik text-black-200 text-center mt-12'>Login to Restate with Google</Text>

          <TouchableOpacity onPress={handleLogin} className='bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5'>
            <View className='flex flex-row justify-center items-center'>
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />

              <Text className='text-lg font-rubik text-black-300 ml-2'>Continue with Google</Text>

            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;