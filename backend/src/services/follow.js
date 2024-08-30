import Follow from '../models/follow.js'

export const followThisUser = async (followingId, profileId) => {
  try {
    // i'm following the user?
    const following = await Follow.findOne({ following_user: profileId, followed_user: followingId })

    // the user is following me?
    const follower = await Follow.findOne({ following_user: followingId, followed_user: profileId })
    return {
      following: !!following,
      follower: !!follower
    }
  } catch (error) {
    throw new Error('Error: ', error)
  }
}
