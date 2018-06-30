import React, { PureComponent } from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  WebView,
  Dimensions
} from 'react-native';

import RNFetchBlob from 'react-native-fetch-blob';
import {CachedImage} from 'react-native-cached-image';

//customize components
import FeedHeader from '../../components/Feed_FeedHeader/Feed_FeedHeader'
import FeedText from '../../components/Feed_FeedText/Feed_FeedText'
import ImageSlider from '../Common_ImageSlider/Common_ImageSlider.js'

const DOMAIN = "http://www.ichild.com.sg";

export default class FeedItem extends PureComponent {
  constructor(props){
    super(props);
    this.feedTitleFontSize = 22;
    this.feedFontSize = 16;
    var {height, width} = Dimensions.get('window')
    this.screenWidth = width
  }

  initStyle(){
    if (this.props.feedTitleFontSize && this.props.feedTitleFontSize != this.feedTitleFontSize) {
      this.feedTitleFontSize = this.props.feedTitleFontSize;
    }
    if (this.props.feedFontSize && this.props.feedFontSize != this.feedFontSize) {
      this.feedFontSize = this.props.feedFontSize;
    }
  }

  _extention(filename){
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
  }

  _download(filename, url){
    var date      = new Date();
    var ext       = this._extention(url);
    ext = "."+ext[0];
    const { config, fs } = RNFetchBlob
    let PictureDir = fs.dirs.DownloadDir
    let options = {
      fileCache: true,
      addAndroidDownloads : {
        useDownloadManager : true,
        notification : true,
        path:  PictureDir + '/' + filename,
        description : 'File'
      }
    }
    config(options).fetch('GET', url).then((res) => {
      Alert.alert("Success Downloaded");
    });
  }

  render() {
    this.initStyle();
    // <ImageSlider
    //   id={`imageSlider`}
    //   width={this.screenWidth - 30}
    //   height={300}
    //   fullScreen={true}
    //   showIndex={0}
    //   lazyLoad={false}
    //   navigation = {true}
    //   resizeMode = {'contain'}
    //   data={[{"image" : "DOMAIN + images[0].path", "description":""}]}
    //   />

    // <CachedImage
    //   style={{
    //     width: '100%',
    //     height: 300,
    //   }}
    //   source={{uri: DOMAIN + images[0].path}}
    // />

    // <WebView
    //   style={{width: '100%',height: 225,}}
    //   javaScriptEnabled={true}
    //   source={{uri: images[0].path + '&autoplay=0&showinfo=0&controls=1'}}
    // />
    var renderFeedImage = (images) => {
      if(images.length > 0){
        if(images.length > 1)
        {
          return(
            <FlatList
              numColumns={3}
              data={images}
              keyExtractor={(item, index) => index}
              listKey={(item, index) => item.upload_id}
              renderItem={({item}) => renderImage(item)}
            />
          )
        }else{
          if(images[0].type == 'Photo'){
            //Alert.alert(DOMAIN + images[0].path)
            return(
              <ImageSlider
                id={`imageSlider`}
                width={this.screenWidth - 30}
                height={300}
                fullScreen={true}
                navigation = {true}
                resizeMode = {'cover'}
                data={[{"image" : DOMAIN + images[0].path, "description":""}]}
                />
            )
          }
          else if(images[0].type == 'Video'){
            return(
              <ImageSlider
                id={`imageSlider`}
                width={this.screenWidth - 30}
                height={225}
                fullScreen={true}
                navigation = {true}
                resizeMode = {'cover'}
                data={[{"image" : images[0].path, "description":""}]}
              />
            )
          }
        }
      }
      else{
        return(
          <View/>
        )
      }
    }

    var renderFeedAttachment = (files) => {
      if(files.length > 0){
        return (
          <FlatList
            numColumns={2}
            data={files}
            keyExtractor={(item, index) => item.upload_id}
            listKey={(item, index) => item.upload_id}
            renderItem={({item}) => renderFiles(item)}
          />
        )
      }
      else{
        return(
          <View/>
        )
      }
    }

    var renderImage = (image) => {
      if(image.type == 'Photo'){
        return (
          <View style={{
            width: '33%',
            marginVertical: 5
          }}>
            <ImageSlider
              id={`imageSlider`}
              width={(this.screenWidth/3)-15}
              height={120}
              fullScreen={true}
              navigation = {true}
              resizeMode = {'cover'}
              data={[{"image" : DOMAIN + image.path, "description":""}]}
              />
          </View>
        )
      }
      else if(image.type == 'Video'){
        return (
          <View style={{
            width: '33%',
            padding: 5
          }}>
            <ImageSlider
              id={`imageSlider`}
              width={(this.screenWidth/3)-15}
              height={120}
              fullScreen={true}
              navigation = {true}
              resizeMode = {'cover'}
              data={[{"image" : image.path, "description":""}]}
            />
          </View>
        )
      }

    }

    var renderFiles = (item) => {
      var filename = item.name;
      var url = item.path;

      var ext = this._extention(url);
      var icon;
      if(ext == 'pdf')
      {
        icon = require('../../assets/icons/pdf_icon.png');
      }
      else if(ext == 'doc' || ext == 'docx'){
        icon = require('../../assets/icons/doc_icon.png');
      }
      else if(ext == 'xls' || ext == 'xlsx'){
        icon = require('../../assets/icons/excel_icon.png');
      }
      else if(ext == 'png' || ext == 'jpg' || ext == 'jpeg'){
        icon = require('../../assets/icons/pic-icon.png');
      }
      else{
        icon = require('../../assets/icons/file_icon.png');
      }

      return (
        <TouchableOpacity style={{width: '50%'}}
          onPress={() => this._download(filename, DOMAIN + url)}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Image
              source={icon}
            />
            <Text numberOfLines={1} style={{flex: 1}}>{filename}</Text>
          </View>
        </TouchableOpacity>
      )
    }

    return (
      <View style={{
          backgroundColor: 'white',
          marginVertical: 5,
          paddingVertical: 20,
          paddingHorizontal: 15
      }}>

        <FeedHeader
          feedFontSize = {this.feedFontSize}
          feedTitle = {this.props.feedTitle}
          userName = {this.props.userName}
          schoolName = {this.props.schoolName}
          postedDate = {this.props.postedDate}
          userImage = {DOMAIN + this.props.userImage}
          />

        <FeedText
          feedFontSize = {this.feedFontSize}
          feedText = {this.props.feedText}
        />
      <View>
        {renderFeedImage(this.props.feedImages)}
      </View>
      <View>
        {renderFeedAttachment(this.props.files)}
      </View>



      </View>
    )
  }
}
