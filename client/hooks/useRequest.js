import axios from "axios";
import { useState } from "react";

function useRequest({ url, method, body }) {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios({
        method,
        url,
        data: body,
      });
      return response.data;
    } catch (e) {
      setErrors(
        <div className="alert alert-danger">
          {e.response.data.errors.map((e) => (
            <h4 key={e.field}>{e.message}</h4>
          ))}
        </div>
      );
    }
  };

  return { doRequest, errors };
}

export default useRequest;
