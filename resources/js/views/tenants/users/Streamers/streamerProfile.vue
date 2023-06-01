<!--<template>
   <div class="profile">
    <img class="profile-user-img" :src="profilePicture" alt="Profile Picture">
    <h2 class="profile-username">{{ name }}</h2>
     Rest of the component 
  </div>
  <div>
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3">
            <div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <div class="text-center">
                  <img class="profile-user-img img-fluid img-circle"
                       :src="profilePicture"
                       alt="User profile picture">
                </div>

                <h3 class="profile-username text-center">{{ name }}</h3>

                <p class="text-muted text-center">{{ occupation }}</p>

                <ul class="list-group list-group-unbordered mb-3">
                  <li class="list-group-item">
                    <b>Followers</b> <span class="float-right">{{ followers }}</span>
                  </li>
                  <li class="list-group-item">
                    <b>Following</b> <span class="float-right">{{ following }}</span>
                  </li>
                  <li class="list-group-item">
                    <b>Friends</b> <span class="float-right">{{ friends }}</span>
                  </li>
                </ul>

                <button class="btn btn-primary btn-block" @click="follow">
                  <b>Follow</b>
                </button>
              </div>
            </div>

            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">About Me</h3>
              </div>
              <div class="card-body">
                <strong><i class="fas fa-book mr-1"></i> Education</strong>
                <p class="text-muted">{{ education }}</p>

                <hr>

                <strong><i class="fas fa-map-marker-alt mr-1"></i> Location</strong>
                <p class="text-muted">{{ location }}</p>

                <hr>

                <strong><i class="fas fa-pencil-alt mr-1"></i> Skills</strong>
                <p class="text-muted">
                  <span v-for="skill in skills" class="tag" :class="skill.class">{{ skill.name }}</span>
                </p>

                <hr>

                <strong><i class="far fa-file-alt mr-1"></i> Notes</strong>
                <p class="text-muted">{{ notes }}</p>
              </div>
            </div>
          </div>

          <div class="col-md-9">
            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeTab === 'activity' }"
                       href="#activity" @click="changeTab('activity')">Activity</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeTab === 'timeline' }"
                       href="#timeline" @click="changeTab('timeline')">Timeline</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeTab === 'settings' }"
                       href="#settings" @click="changeTab('settings')">Settings</a>
                  </li>
                </ul>
              </div>
              <div class="card-body">
                <div v-if="activeTab === 'activity'">
                  <div class="post" v-for="post in posts" :key="post.id">
                    <div class="user-block">
                      <img class="img-circle img-bordered-sm" :src="post.userAvatar" alt="User image">
                      <span class="username">
                        <a href="#">{{ post.userName }}</a>
                      </span>
                      <span class="description">{{ post.timestamp }}</span>
                    </div>
                    <p>{{ post.content }}</p>
                    <div class="interaction">
                      <button @click="likePost(post.id)">Like</button>
                      <button @click="sharePost(post.id)">Share</button>
                      <button @click="commentPost(post.id)">Comment</button>
                    </div>
                  </div>
                </div>
                <div v-else-if="activeTab === 'timeline'">
                  <div class="timeline-item" v-for="event in timeline" :key="event.id">
                    <i class="fas fa-envelope bg-primary"></i>
                    <div class="timeline-item-content">
                      <span class="time"><i class="fas fa-clock"></i> {{ event.timestamp }}</span>
                      <h3 class="timeline-header">{{ event.title }}</h3>
                      <div class="timeline-body">{{ event.description }}</div>
                    </div>
                  </div>
                </div>
                <div v-else-if="activeTab === 'settings'">
                  <form>
                    <div class="form-group">
                      <label for="name">Name</label>
                      <input type="text" class="form-control" id="name" v-model="settings.name">
                    </div>
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input type="email" class="form-control" id="email" v-model="settings.email">
                    </div>
                    <div class="form-group">
                      <label for="experience">Experience</label>
                      <input type="text" class="form-control" id="experience" v-model="settings.experience">
                    </div>
                    <div class="form-group">
                      <label for="skills">Skills</label>
                      <input type="text" class="form-control" id="skills" v-model="settings.skills">
                    </div>
                    <button type="submit" class="btn btn-primary">Save</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profilePicture: "/path/to/profile-picture.jpg",
      name: "John Doe",
      occupation: "Software Developer",
      followers: 500,
      following: 300,
      friends: 200,
      education: "Bachelor's Degree in Computer Science",
      location: "San Francisco, CA",
      skills: [
        { name: "HTML", class: "badge badge-primary" },
        { name: "CSS", class: "badge badge-primary" },
        { name: "JavaScript", class: "badge badge-primary" }
      ],
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      activeTab: "activity",
      posts: [
        {
          id: 1,
          userName: "Jane Smith",
          userAvatar: "/path/to/user-avatar.jpg",
          timestamp: "2 hours ago",
          content: "Hello, everyone! What a great day!"
        },
        {
          id: 2,
          userName: "Bob Johnson",
          userAvatar: "/path/to/user-avatar.jpg",
          timestamp: "1 day ago",
          content: "Check out this awesome article I found!"
        }
      ],
      timeline: [
        {
          id: 1,
          timestamp: "5 days ago",
          title: "Meeting with clients",
          description: "Discussed project requirements and timelines."
        },
        {
          id: 2,
          timestamp: "1 week ago",
          title: "Team outing",
          description: "Had a fun day out with the team."
        }
      ],
      settings: {
        name: "John Doe",
        email: "johndoe@example.com",
        experience: "5 years",
        skills: "HTML, CSS, JavaScript"
      }
    };
  },
  methods: {
    follow() {
      // Follow logic
    },
    changeTab(tab) {
      this.activeTab = tab;
    },
    likePost(postId) {
      // Like post logic
    },
    sharePost(postId) {
      // Share post logic
    },
    commentPost(postId) {
      // Comment post logic
    }
  }
};
</script>

<style scoped>
.tag {
  margin-right: 5px;
}

<style>
.profile-user-img {
  border: 3px solid #666;
  margin: 0 auto;
  padding: 3px;
  width: 100px;
}

.profile-username {
  font-size: 21px;
  margin-top: 5px;
}

.post {
  border-bottom: 1px solid #666;
  color: #666;
  margin-bottom: 15px;
  padding-bottom: 15px;
}

.post:last-of-type {
  border-bottom: 0;
  margin-bottom: 0;
  padding-bottom: 0;
}

.user-block {
  margin-bottom: 15px;
  width: 100%;
}

.row {
  width: 100%;
}

/* Dark mode styles */
@media (prefers-color-scheme: dark) {
  .post {
    color: #fff;
    border-color: #666;
  }
}
</style> -->

<template> 
  <div class="profile">
    <!-- <img class="profile-user-img" :src="avatar" alt="Profile Picture"> -->
     <!-- <h2 class="profile-username">{{ name }}</h2>   -->
  </div>
  <div>
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3">
            <div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <!-- <div class="text-center">
                  <img class=""
                       :src= "avatar"
                       alt="User profile picture">
                </div> -->

                <h3 class="profile-username text-center">{{ first_name }} {{ last_name }}</h3>

                 <!-- <p class="text-muted text-center">{{ last_name }}</p>  -->

                <ul class="list-group list-group-unbordered mb-3">
                  <li class="list-group-item">
                    <b>Followers</b> <span class="float-right">{{ followers }}</span>
                  </li>
                  <li class="list-group-item">
                    <b>Following</b> <span class="float-right">{{ following }}</span>
                  </li>
                  <li class="list-group-item">
                    <b>Friends</b> <span class="float-right">{{ friends }}</span>
                  </li>
                </ul>

                <button class="btn btn-primary btn-block" @click="follow">
                  <b>Subscribe</b>
                </button>
              </div>
            </div>

            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">About Me</h3>
              </div>
              <div class="card-body">
                <strong><i class="fas fa-book mr-1"></i> Languages</strong>
                <p class="text-muted">{{ languages }}</p>

                <hr>

                <strong><i class="fas fa-map-marker-alt mr-1"></i> Location</strong>
                <p class="text-muted">{{ location }}</p>

                <hr>

                <strong><i class="fas fa-pencil-alt mr-1"></i> Skills</strong>
                <p class="text-muted">
                  <span v-for="skill in skills" class="tag" :class="skill.class">{{ skill.name }}</span>
                </p>

                <hr>

                <strong><i class="far fa-file-alt mr-1"></i> Notes</strong>
                <p class="text-muted">{{ notes }}</p>
              </div>
            </div>
          </div>

          <div class="col-md-9">
            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeTab === 'activity' }"
                       href="#activity" @click="changeTab('activity')">Activity</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeTab === 'timeline' }"
                       href="${id}/#timeline" @click="changeTab('timeline')">Timeline</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeTab === 'settings' }"
                       href="#settings" @click="changeTab('settings')">Settings</a>
                  </li>
                </ul>
              </div>
              <div class="card-body">
                <div v-if="activeTab === 'activity'">
                  <div class="post" v-for="post in posts" :key="post.id">
                    <div class="user-block">
                      <!-- <img class="img-circle img-bordered-sm" :src="avatar" alt="User image"> -->
                      <span class="username">
                        <a href="#">{{ post.userName }}</a>
                      </span>
                      <span class="description">{{ post.timestamp }}</span>
                    </div>
                    <p>{{ post.content }}</p>
                    <div class="interaction">
                      <button @click="likePost(post.id)">Like</button>
                      <button @click="sharePost(post.id)">Share</button>
                      <button @click="commentPost(post.id)">Comment</button>
                    </div>
                  </div>
                  <div>
                    <iframe width="580" height="384" :src="videoUrl" title="Call of Duty®:Mobile - Cinematic Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                </div>
                <div v-else-if="activeTab === 'timeline'">
                  <div class="timeline-item" v-for="event in timeline" :key="event.id">
                    <i class="fas fa-envelope bg-primary"></i>
                    <div class="timeline-item-content">
                      <span class="time"><i class="fas fa-clock"></i> {{ event.timestamp }}</span>
                      <h3 class="timeline-header">{{ event.title }}</h3>
                      <div class="timeline-body">{{ event.description }}</div>
                    </div>
                  </div>
                </div>
                <div v-else-if="activeTab === 'settings'">
                  <form>
                    <div class="form-group">
                      <label for="name">Name</label>
                      <input type="text" class="form-control" id="name" v-model="settings.name">
                    </div>
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input type="email" class="form-control" id="email" v-model="settings.email">
                    </div>
                    <div class="form-group">
                      <label for="experience">Experience</label>
                      <input type="text" class="form-control" id="experience" v-model="settings.experience">
                    </div>
                    <div class="form-group">
                      <label for="skills">Skills</label>
                      <input type="text" class="form-control" id="skills" v-model="settings.skills">
                    </div>
                    <button type="submit" class="btn btn-primary">Save</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// Import axios and useRoute
import axios from 'axios';
import { useRoute } from 'vue-router';
//import avatar1 from './avatars/1.jpg';

export default {
  computed: {
    // avatar() {
    //   const route = useRoute();
    //   const itemId = route.params.itemId;
    //   return `/js/views/tenants/users/Streamers/avatars/1.jpg`; // Replace with your dynamic URL logicresources
    // },
    name() {
      const route = useRoute();
      const itemId = route.params.itemId;
      return `user ${itemId}`; // Replace with your dynamic name logic
    },
  },
  data() {
    return {
      first_name: '',
      last_name: '',
      // Rest of your data properties
      avatar:'./avatars/1.jpg',
      videoUrl: "https://www.youtube.com/embed/tv7LfFeamsc",
      followers: 500,
      following: 300,
      friends: 200,
      languages: "English, French",
      location: "San Francisco, CA",
      skills: [
        { name: "Markating", class: "badge badge-primary" },
        { name: "Streaming", class: "badge badge-primary" },
        { name: "Presenting", class: "badge badge-primary" }
      ],
      notes: "As a passionate streamer, I strive to create an engaging and entertaining environment for my viewers",
      activeTab: "activity",
      posts: [
        {
          id: 1,
          userName: "Jane Smith",
          userAvatar: "/path/to/user-avatar.jpg",
          timestamp: "2 hours ago",
          content: "Hello, everyone! What a great day!"
        },
        {
          id: 2,
          userName: "Bob Johnson",
          userAvatar: "/path/to/user-avatar.jpg",
          timestamp: "1 day ago",
          content: "Check out this awesome article I found!"
        }
      ],
      timeline: [
        {
          id: 1,
          timestamp: "5 days ago",
          title: "Meeting with clients",
          description: "Discussed project requirements and timelines."
        },
        {
          id: 2,
          timestamp: "1 week ago",
          title: "Team outing",
          description: "Had a fun day out with the team."
        }
      ],
      settings: {
        name: "John Doe",
        email: "johndoe@example.com",
        experience: "5 years",
        skills: "HTML, CSS, JavaScript"
      }
    };
  },
  methods: {
    follow() {
      // Follow logic
    },
    changeTab(tab) {
      this.activeTab = tab;
    },
    likePost(postId) {
      // Like post logic
    },
    sharePost(postId) {
      // Share post logic
    },
    commentPost(postId) {
      // Comment post logic
    }
    
  },
  mounted() {
    this.fetchProfileData();
  },
  methods: {
    fetchProfileData() {
      const id = this.$route.params.id;
      axios.get(`/api/streamer/profile/${id}`) // Replace with your API endpoint URL
        .then(response => {
          console.log(response.data.data.user);
           const profileData = response.data.data.user;
           this.first_name = profileData.first_name;
           this.last_name = profileData.last_name;
          // Update other data properties accordingly
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};

</script>


<style scoped>
/* .profile-user-img {
  border: 3px solid #666;
  margin: 0 auto;
  padding: 3px;
  width: 100px;
} */

.profile-username {
  font-size: 21px;
  margin-top: 5px;
}

.tag {
  margin-right: 5px;
}

.post {
  border-bottom: 1px solid #666;
  color: #666;
  margin-bottom: 15px;
  padding-bottom: 15px;
}

.post:last-of-type {
  border-bottom: 0;
  margin-bottom: 0;
  padding-bottom: 0;
}

.user-block {
  margin-bottom: 15px;
  width: 100%;
}

.row {
  width: 100%;
}

</style>
