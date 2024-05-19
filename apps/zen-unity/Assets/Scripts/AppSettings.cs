namespace Zen
{
#if DEVELOPMENT_BUILD || UNITY_EDITOR
    public static class AppSettings
    {
        public const string GraphQLURL = "http://localhost:7080/graphql";
        public const string AddressablesURL = "http://localhost:4200/assets/unity/ServerData/WebGL";

    }
#else
    public static class AppSettings
    {
        // TODO: correctly set the URLs for production builds
        public const string GraphQLURL = "https://api.zen.com/graphql";
        public const string AddressablesURL = "http://zen.com/assets/unity/ServerData/WebGL";
    }
#endif
}
