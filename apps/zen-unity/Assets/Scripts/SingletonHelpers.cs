using UnityEngine;

namespace Zen
{
    /// <summary>
    /// A static instance is like a singleton, but instead of destroying any new instances,
    /// it overrides the current instance.  This is handy for resetting the state and saves
    /// you from doing it manually.
    /// </summary>
    /// <see href="https://youtu.be/tE1qH8OxO2Y?si=39NPVZ9ybJl9fnyt&t=180">Tarodev: Unity Architecture for Noobs - Game Structure</see>
    public abstract class StaticInstance<T> : MonoBehaviour where T : MonoBehaviour
    {
        public static T Instance { get; private set; }
        protected virtual void Awake() => Instance = this as T;
        protected virtual void OnApplicationQuit()
        {
            Instance = null;
            Destroy(gameObject);
        }
    }

    /// <summary>
    /// This transforms the static instance into a basic singleton. This will destroy any new
    /// versions created, leaving the original instance intact.
    /// </summary>
    public abstract class Singleton<T> : StaticInstance<T> where T : MonoBehaviour
    {
        protected override void Awake()
        {
            if (Instance != null) Destroy(gameObject);
            base.Awake();
        }
    }

    /// <summary>
    /// A persistent version of the singleton. This will survive through scene
    /// loads.  Perfect for system classes which require stateful, persistent data.
    /// Or audio sources where music plays through loading screens, etc.
    /// </summary>
    public abstract class PersistentSingleton<T> : Singleton<T> where T : MonoBehaviour
    {
        protected override void Awake()
        {
            base.Awake();
            DontDestroyOnLoad(gameObject);
        }
    }
}
