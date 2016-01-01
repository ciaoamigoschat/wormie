import React, {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Component,
  Image,
  TouchableHighlight,
} from 'react-native';
import ViewMyWormhole from '../containers/ViewMyWormhole';
import Topbar from './Topbar';

import { Icon } from 'react-native-icons';
var Mapbox = require('react-native-mapbox-gl');
var mapboxConfig = require('../utils/mapboxConfig');
var mapRef = 'mapRef';
var YouTube = require('react-native-youtube');

var styles = StyleSheet.create({
  container:{
    // marginTop: 20,
    flex:1,
    alignItems: 'stretch',
  },
  submitterName: {
    fontSize: 15,
    color: '#00ADC7',
    alignSelf: 'flex-start',
    flex: 1,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  back: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    flex: 1, 
    alignSelf: 'center'
  },
  topbar: {
    color: '#4CC6EA', 
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    flexDirection: 'row',
    flex: 1
  },
  topBarText: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    flex: 10,
    alignSelf: 'center'
  },
  ionic: { 
    width: 30, 
    height: 30, 
    marginLeft: 5, 
    marginTop: 5,
  },
  submissionNotes: {
    borderRadius: 5, 
    fontFamily: 'Lato-Bold',
    fontSize: 15, 
    paddingBottom: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0', 
    color: '#585858', 
  },
  buttonText: {
    fontSize: 15,
    color: '#4CC6EA',
    alignSelf: 'flex-start',
    flex: 1,
    fontWeight: 'bold'
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  submitterProfile: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 3,
    backgroundColor: 'white',
  },
  requestList: {
    color: 'purple',
    flex: 3,
    flexDirection: 'column',
  },
  noMatch: {
    margin: 8, 
    borderRadius: 10, 
    fontFamily: 'Lato-Bold',
    color: 'white',
    backgroundColor: '#00ADC7',
    // backgroundColor: '#A88FFF',
    fontSize: 20,
    padding: 10,
    alignSelf: 'center',
  },
  ouch: {color: '#ffa950', justifyContent: 'center', alignSelf: 'center', fontFamily: 'Lato-Bold', fontSize: 30},
  buttonText: {
    fontSize: 18,
    color: '#00ADC7',
    alignSelf: 'flex-start',
    flex: 1,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
});

var ViewMyWormholeList = React.createClass({
  mixins: [Mapbox.Mixin],
  back() {
    this.props.navigator.pop();
  },

  viewRequest(index) {
    var { updateMyCurrentWormholeList, myCurrentWormholeList } = this.props;
    console.log('trying to view request: ', myCurrentWormholeList);
    
    // UPDATECURRENTWORMHOLE
    // this function is setting current Wormhole to set the top-state
    // top state will contain information about what the current wormhole is
    // current wormhole is the next page after user press current request
    this.props.navigator.push({
      component: ViewMyWormhole,
      passProps: {wormhole: myCurrentWormholeList.submissions[index]}
    });
  },

  showWormhole() {
    var { myCurrentWormholeList } = this.props;

    if (myCurrentWormholeList.submissions.length) {
      return (
        <ScrollView
          automaticallyAdjustContentInsets={false}
          onScroll={() => { console.log('onScroll!'); }}
          scrollEventThrottle={200}
          style={{backgroundColor: 'white' }}
        >
          {this.createList()}
        </ScrollView>
      )       
    } else {
      return (
        <View
          style={{
            flex:1, 
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white'
          }}
        >
          <View
            style={{alignSelf: 'center'}}
          >
            <Text style={styles.ouch}>
              OUCH!
            </Text>
            <Image 
              source = {require('../assets/small-red-wormie.png')}
              style={{alignSelf: 'center', width: 150, height: 215}}
            />
            <Text style={styles.noMatch}>No Match Found</Text>
          </View>
        </View>
      )
    }

  },

  video() {
    let { myCurrentSubmission } = this.props;
    return (
      <YouTube 
        videoId={myCurrentSubmission.video_url}
        play={false}
        hidden={false}
        playsInline={true}
        showinfo={false}
        modestbranding={true}
        onError={(e)=>{console.log('youtube error: ', e.error)}}
        style={{alignSelf: 'stretch', height: 220, backgroundColor: 'transparent', marginBottom: 0}}
      />
    );
  },

                // <Image 
                //   source = {{uri: imageUrl}}
                //   style={{alignSelf: 'center', width: 150, height: 215}}
                // />


  // if function returns jsx/array of jsx, it does not take .bind(this)
  createList() {
    var { myCurrentWormholeList } = this.props;
    var submitList, submitters;
    console.log(myCurrentWormholeList.submissions.length);
    if (myCurrentWormholeList.submissions.length > 0) {
      console.log('working well');
      submitList = myCurrentWormholeList.submissions.map((submission, index) => {
        let imageUrl = `https://i.ytimg.com/vi/${submission['video_url']}/mqdefault.jpg`;
        console.log('submission', submission);
        return (
          <View style={{height: 300}}>
            <Text style={styles.buttonText}>{submission.wormhole.title} </Text>
            <View 
              style = {styles.submitterProfile}
            >
              <Image 
                style = {styles.image}
                source = {{uri: submission.submitter.picture_url}}
              />
              <View>
                <Text style={styles.submitterName}>{submission.submitter.username}</Text>
                <Text style={styles.submissionNotes}>Notes: { submission.notes }</Text>
              </View>
            </View>
            <View
              style={{flex: 8, flexDirection: 'row', backgroundColor: 'red', margin: 20, marginTop: 0}}
            >
              <View style={{flex: 1}}>
                <YouTube 
                  videoId={submission.video_url}
                  play={false}
                  hidden={false}
                  playsInline={true}
                  showinfo={false}
                  modestbranding={true}
                  onError={(e)=>{console.log('youtube error: ', e.error)}}
                  style={{flex: 1}}
                />
              </View>
              <View style={{flex: 1}}>
                <Mapbox
                  style={{flex: 1, opacity: 1}}
                  direction={0}
                  rotateEnabled={true}
                  scrollEnabled={true}
                  zoomEnabled={true}
                  showsUserLocation={false}
                  attributionButtonIsHidden={true}
                  logoIsHidden={true}
                  compassIsHidden={true}
                  ref={mapRef}
                  accessToken={mapboxConfig.accessToken}
                  styleURL={mapboxConfig.styleURL}
                  userTrackingMode={this.userTrackingMode.follow}
                  zoomLevel={15}
                  annotations={[]}
                />
              </View>
              
            </View>
          </View>
        );
      });

      submitters = (
        { submitList }
      )
    } else {
      submitters = <View />;
    }

    return (
      <View 
        style = {styles.requestList}
      >
        { submitters }
      </View>
    );
  },

  render() {
    return (
      //use {} for anything that is not html or text. this allows you to run JS in JSX
      <View
        style={styles.container}
      >
        <Topbar 
          topbarTitle={"Wormholes"} 
          navigator={this.props.navigator}
        />
        <View
          style={{flex: 1}}
        >
          {this.showWormhole()}
        </View>
      </View>
    );
  }
});

export default ViewMyWormholeList;
