using UnityEngine;
using Zen.GraphQL;

namespace Zen
{
    public class GraphQLSample : MonoBehaviour
    {
        async void Start()
        {
            var variables = new GraphQL.Types.AuthLoginInput
            {
                username = "zen",
                password = "TempTemp",
                rememberMe = true
            };

            var request = AuthLoginSampleGQL.Request(new { data = variables });

            try
            {
                // GraphQLManager.Send should always be wrapped in a try catch block
                var response = await GraphQLManager.Send<AuthLoginSampleResponse>(request);
                Debug.Log("AuthLoginSampleGQL user: " + response.data.authLogin.userId);
            }
            catch (GraphQLError err)
            {
                Debug.LogError("AuthLoginSampleGQL error: " + err?.message);
            }
        }
    }
}
