import { Link } from "react-router";
import { MessageCircleIcon, UserIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api.js";
import NoFriendsFound from "../components/NoFriendsFound.jsx";

const FriendsPage = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Your Friends</h1>
          <p className="text-base-content opacity-70">
            Connect and chat with your language learning partners
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {friends.map((friend) => (
              <div
                key={friend._id}
                className="card bg-base-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="card-body p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-full">
                        <img
                          src={friend.profilePic}
                          alt={friend.fullName}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{friend.fullName}</h3>
                      <div className="flex items-center text-xs opacity-70 mt-1">
                        <UserIcon className="size-3 mr-1" />
                        {friend.nativeLanguage && (
                          <span className="badge badge-secondary badge-sm mr-2">
                            {friend.nativeLanguage}
                          </span>
                        )}
                        {friend.learningLanguage && (
                          <span className="badge badge-outline badge-sm">
                            Learning {friend.learningLanguage}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {friend.bio && (
                    <p className="text-sm opacity-70 mb-4 line-clamp-2">
                      {friend.bio}
                    </p>
                  )}

                  <div className="card-actions justify-end">
                    <Link
                      to={`/chat/${friend._id}`}
                      className="btn btn-primary btn-sm gap-2"
                    >
                      <MessageCircleIcon className="size-4" />
                      Message
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
