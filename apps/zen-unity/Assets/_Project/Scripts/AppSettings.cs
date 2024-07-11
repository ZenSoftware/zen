namespace Zen
{

    public static class AppSettings
    {
#if DEVELOPMENT_BUILD || UNITY_EDITOR
        public const string GraphQLURL = "http://localhost:7080/graphql";
        public const string AddressablesURL = "http://localhost:4200/assets/unity/ServerData/WebGL";
#else
        // TODO: correctly set the URLs for production builds
        public const string GraphQLURL = "https://api.zen.com/graphql";
        public const string AddressablesURL = "http://zen.com/assets/unity/ServerData/WebGL";
#endif
    }
}
