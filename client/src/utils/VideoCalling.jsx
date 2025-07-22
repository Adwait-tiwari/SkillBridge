import React, { useEffect, useState } from 'react';
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  ControlBar,
  useTracks,
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import '@livekit/components-styles';
import axios from 'axios';

const VideoUI = ({ roomName }) => {
  const tracks = useTracks([Track.Source.Camera, Track.Source.Microphone]);

  return (
    <>
      <RoomAudioRenderer />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">
          🎥 Live Video Room: <span className="text-blue-600">{roomName}</span>
        </h2>

        <GridLayout tracks={tracks} style={{ height: '70vh' }}>
          {(trackRef) => <ParticipantTile trackRef={trackRef} />}
        </GridLayout>

        <ControlBar />
      </div>
    </>
  );
};

const VideoCalling = () => {
  const [token, setToken] = useState('');
  const [roomName, setRoomName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const joinRoom = async () => {
      try {
        const userName = 'student-' + Math.floor(Math.random() * 1000);
        const room = 'room-' + Date.now();
        setRoomName(room);

        const res = await axios.post('http://localhost:5000/api/livekit/get-token', {
          roomName: room,
          userName: userName,
        }, {
          headers: { 'Content-Type': 'application/json' }
        });

        if (typeof res.data.token === 'string') {
          setToken(res.data.token);
          console.log('✅ Connected with token:', res.data.token);
        } else {
          console.error('❌ Token is not a string:', res.data.token);
        }
      } catch (err) {
        console.error('❌ Error connecting to room:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    joinRoom();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!token || !roomName) return <p>❌ Token or RoomName missing. Cannot join.</p>;

  return (
    <LiveKitRoom
      token={token}
      serverUrl="wss://skillbridge-f2rfnlm8.livekit.cloud"
      connect={true}
      video={true}
      audio={true}
      data-lk-theme="default"
      style={{ height: '100vh' }}
    >
      <VideoUI roomName={roomName} />
    </LiveKitRoom>
  );
};

export default VideoCalling;
