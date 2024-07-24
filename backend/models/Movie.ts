import dynamoose from "../db";

const MovieSchema = new dynamoose.Schema(
  {
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
    releaseYear: {
      type: String,
      required: false,
    },
  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);

const Movie = dynamoose.model("Movies", MovieSchema);

export default Movie;
