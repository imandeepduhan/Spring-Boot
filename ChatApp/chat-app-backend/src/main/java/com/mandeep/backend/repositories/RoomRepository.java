package com.mandeep.backend.repositories;


import com.mandeep.backend.entities.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomRepository extends MongoRepository<Room,String> {

    // get room using room id
    Room findByRoomId(String roomId);

}
