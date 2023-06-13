import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux.hook";
import { setMessages } from "../redux/slice/appSlice";
import { selectorUser } from "../redux/selectors";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const user = useAppSelector((state) => selectorUser(state));
  const dispatch = useAppDispatch();

  const request = useCallback(
    async (
      url: string,
      method = "GET",
      body: any = null,
      headers: any = {}
    ) => {
      setLoading(true);

      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";

          headers["workshop"] = user?.workshop || "notdata";
          headers["userid"] = user?.id || "notdata";
        }

        const response = await fetch(url, { method, body, headers });
        const { data, error, messageFromServer }: any = await response.json();

        if (!response.ok) {
          if (response.status === 401) throw new Error();
          throw new Error(
            error.message ||
              "Что то пошло не так, повторите попытку или обратитесть в поддежку"
          );
        }

        setLoading(false);
        dispatch(setMessages(messageFromServer));

        return data;
      } catch (error: any) {
        setLoading(false);
        dispatch(setMessages(error.message));
        throw error;
      }
    },
    []
  );
  const requestinn = useCallback(async (inn: string) => {
    setLoading(true);

    try {
      var url =
        "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
      var token = "d3e0de6c6969c4ef835efa5afb62ffb3d6f0e76d";
      var query = inn;

      var options: any = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Token " + token,
        },
        body: JSON.stringify({ query: query }),
      };

      let data = await fetch(url, options);

      let text = await data.json();

      setLoading(false);
      //console.log("Эываывавы", text);
      return {
        name: text.suggestions[0].unrestricted_value,
        inn: query,
      };
    } catch (error: any) {
      console.log("error", error);
      setLoading(false);
      dispatch(setMessages("Компания не найдена"));
      throw error;
    }
  }, []);
  return { loading, request, requestinn };
};

export { useHttp };
