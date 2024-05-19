using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using UnityEngine;
using UnityEngine.Networking;

namespace Zen.GraphQL
{
    public class GraphQLManager
    {
        public static async Task<GraphQLResponse<T>> Send<T>(object data)
        {
            var request = new UnityWebRequest(AppSettings.GraphQLURL, "POST");

            if (data != null)
            {
                var bodyRaw = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(data));
                request.uploadHandler = new UploadHandlerRaw(bodyRaw);
            }

            request.downloadHandler = new DownloadHandlerBuffer();
            request.SetRequestHeader("Content-Type", "application/json");
            await request.SendWebRequest();

            if (request.responseCode == 200)
            {
                var deserializedData = JsonConvert.DeserializeObject<GraphQLResponse<T>>(request.downloadHandler.text);

                if (deserializedData.errors != null && deserializedData.errors.Length != 0)
                    throw deserializedData.errors[0];

                return deserializedData;
            }

            throw new System.Exception($"Bad GraphQL request: {request.error}");
        }
    }

    public class GraphQLResponse<T>
    {
        public T data;
        public GraphQLError[] errors;
    }

    public class GraphQLError : System.Exception
    {
        public string message;
        public GraphQLErrorLocation[] locations;
        public string[] path;
        public object extensions;
    }

    public class GraphQLErrorLocation
    {
        public int line;
        public int column;
    }
}
