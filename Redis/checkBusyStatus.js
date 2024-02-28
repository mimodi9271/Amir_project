const checkBusyStatus = async (redisConnection) => {

let redisStatus = "";

  try {
    redisStatus = await redisConnection.get("busy");
  } catch (error) {
    throw new Error("cannot fetch redis data")
  }

  if(redisStatus == "yes"){
    throw new Error("the app is busy , please try a few minutes later")
  }

  try {
    await redisConnection.set("busy" , "yes")
  } catch (error) {
    throw new Error("cannot set redis to busy")
  }
    
  return redisStatus;
}

export default checkBusyStatus;