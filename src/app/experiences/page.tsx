'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'antd';
import SideMenu from '../sidemenu';
import { getExperiences } from '@/api/Api';
import moment, { now } from 'moment';
import './styles.css'; 

const { Meta } = Card;

export default function Page() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<any | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    async function fetch() {
      let result = await getExperiences();
      console.log(result);
      setExperiences(result.data.data);
    }

    fetch();
  }, []);

  const handleViewDetails = (experience: any) => {
    setSelectedExperience(experience);
    setIsModalVisible(true);
  };

  return (
    <SideMenu active='experiences'>
      <h1>Experiences/Outstanding Comments</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {experiences.map((post, index) => (
          <Card key={index} style={{ width: 300 }}>
            <Meta
              title={post.title}
              description={
                <>
                  <p>Author: {post.user?.name}</p>
                  <p>Date: {moment(post.created_at).format('YYYY-MM-DD')}</p>
                  <Button type="primary" onClick={() => handleViewDetails(post)}>
                    View Details
                  </Button>
                </>
              }
            />
          </Card>
        ))}
      </div>

      <Modal
        title="Experience Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedExperience && (
          <>
            <p className="experience-title">Title: {selectedExperience.title}</p>
            <p className="experience-author">Author: {selectedExperience.user?.name}</p>
            <p className="experience-date">Date: {moment(selectedExperience.created_at).format('YYYY-MM-DD')}</p>
            
            <p >Body:</p>
            <p className="experience-body">{selectedExperience.experiences}</p>
          </>
        )}
      </Modal>
    </SideMenu>
  );
}
