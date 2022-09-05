import axios from "axios";

export default function CallApi(
  method = "get",
  url = `https://625ac672e5365680a1edcf06.mockapi.io/todoList`,
  body
) {
  return axios({
    method: method,
    url: url,
    data: body,
  }).catch((error) => {
    console.log(error);
  });
}
