import dynamoose from "../db";

const MovieSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
  },
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
    required: false,
  },
});

const Movie = dynamoose.model("Movies", MovieSchema);

export default Movie;
