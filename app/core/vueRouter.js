/* eslint import/no-absolute-path: 0 */
import VueRouter from 'vue-router'
const utils = require('./utils')

let vueRouter

export default function getVueRouter () {
  if (typeof vueRouter === 'undefined') {
    vueRouter = new VueRouter({
      // Routing is currently driven by Backbone Router.  When we migrate away from backbone, switch to history
      mode: 'abstract',

      routes: [
        {
          path: '/ai-junior',
          component: () => import(/* webpackChunkName: "aiJunior" */ 'app/views/ai-junior/AIJuniorView'),
          children: [
            {
              path: '',
              component: () => import(/* webpackChunkName: "aiJunior" */ 'app/views/ai-junior/AIJuniorLandingView'),
            },
            {
              path: 'project/:scenarioId',
              component: () => import(/* webpackChunkName: "aiJunior" */ 'app/views/ai-junior/AIJuniorScenarioView'),
              props: true,
            },
            {
              path: 'project/:scenarioId/:userId',
              component: () => import(/* webpackChunkName: "aiJunior" */ 'app/views/ai-junior/AIJuniorScenarioUserView'),
              props: true,
            },
            {
              path: 'project/:scenarioId/:userId/:projectId',
              component: () => import(/* webpackChunkName: "aiJunior" */ 'app/views/ai-junior/AIJuniorScenarioUserProjectView'),
              props: true,
            },
            {
              path: 'demo',
              component: () => import(/* webpackChunkName: "aiJunior" */ 'app/views/ai-junior/AIJuniorDemoView'),
              props: true,
            },
          ],
        },
        {
          path: '/announcements',
          component: () => import(/* webpackChunkName: "AnnouncementView" */ 'app/views/announcement/AnnouncementView'),
        },
        {
          path: '/event-calendar/:eventType?',
          name: 'eventCalendar',
          component: () => import(/* webpackChunkName: "EventView" */ 'app/views/events/index'),
          props: true,
        },
        {
          path: '/premium',
          props: (route) => ({ showPremium: true, type: route.query.type }),
          component: () => import(/* webpackChunkName: "ParentsView" */ 'app/views/landing-pages/premium/PagePremium'),
          meta: { theme: 'teal' },
        },
        {
          path: '/parents',
          props: (route) => ({ showPremium: true, type: route.query.type }),
          component: () => import(/* webpackChunkName: "ParentsView" */ 'app/views/landing-pages/parents-v2/PageParents'),
          meta: { theme: 'teal' },
        },
        {
          path: '/hackstack',
          component: () => import(/* webpackChunkName: "HackStackView" */ 'app/views/landing-pages/hackstack/PageHackStack'),
          meta: { theme: 'teal' },
        },
        {
          path: '/codequest',
          component: () => import(/* webpackChunkName: "CodequestView" */ 'app/views/codequest/PageCodequest.vue'),
          meta: { theme: 'teal' },
        },
        {
          path: '/teachers/hour-of-code',
          component: () => import(/* webpackChunkName: "CodequestView" */ 'app/views/landing-pages/hoc/PageHoc.vue'),
        },
        {
          path: '/diversity-equity-and-inclusion',
          component: () => import(/* webpackChunkName: "dei" */ 'app/views/dei/DEIView.vue'),
        },
        { path: '/dei', redirect: '/diversity-equity-and-inclusion' }, // TODO: doesn't actually update to /diversity-equity-and-inclusion URL, just adds alias
        {
          path: '/editor/cinematic',
          component: () => import(/* webpackChunkName: "editor" */ '../../ozaria/site/components/cinematic/PageCinematicEditor/BaseCinematicList'),
        },
        {
          path: '/league',
          component: () => import(/* webpackChunkName: "LeagueView" */ 'app/views/landing-pages/league/PageLeague'),
          children: [
            // Stub pages
            { path: '', component: () => import(/* webpackChunkName: "LeagueView" */ 'app/views/landing-pages/league/PageLeagueGlobal') },
            {
              path: 'ladders/:idOrSlug?',
              name: 'LaddersList',
              component: () => import(/* webpackChunkName: "mainLadderViewV2" */'app/views/ladder/MainLadderViewV2'),
              props: (route) => ({ ...route.query, ...route.params }),
              meta: { toTop: true },
            },
            { path: ':idOrSlug', component: () => import(/* webpackChunkName: "LeagueView" */ 'app/views/landing-pages/league/PageLeagueGlobal') },
          ],
        },
        {
          path: '/admin/trial-classes',
          component: () => import(/* webpackChunkName: "TrialClassView" */ 'app/views/online-class/TrialClassesView'),
          props: (_route) => ({ isAdminView: true }),
        },
        {
          path: '/trial-classes',
          component: () => import(/* webpackChunkName: "TrialClassView" */ 'app/views/online-class/TrialClassesView'),
        },
        {
          path: '/trial-classes/:eventId/confirm/:token',
          name: 'TrialClassConfirm',
          component: () => import(/* webpackChunName: 'TrialClassConfirm' */ 'app/views/online-class/TrialClassConfirm'),
          props: (route) => ({ ...route.params }),
        },
        {
          path: '/live-classes',
          props: (route) => ({ showPremium: true, type: route.query.type || 'live-classes' }),
          component: () => import(/* webpackChunkName: "ParentsView" */ 'app/views/landing-pages/parents-v2/PageParents'),
          meta: { theme: 'teal' },
        },
        {
          path: '/live',
          props: (route) => ({ showPremium: true, type: route.query.type || 'direct-mail' }),
          component: () => import(/* webpackChunkName: "ParentsView" */ 'app/views/landing-pages/parents-v2/PageParents'),
          meta: { theme: 'teal' },
        },
        {
          // TODO: The cinematic editor route should use vue guards to check for admin access.
          // TODO: Once we have a base editor component, use the nested route structure.
          path: '/editor/cinematic/:slug',
          component: () => import(/* webpackChunkName: "editor" */ '../../ozaria/site/components/cinematic/PageCinematicEditor'),
          props: true,
        },
        {
          path: '/editor/cutscene',
          component: () => import(/* webpackChunkName: "editor" */ '../../ozaria/site/components/cutscene/PageCutsceneEditorList'),
        },
        {
          path: '/editor/cutscene/:slugOrId',
          component: () => import(/* webpackChunkName: "editor" */ '../../ozaria/site/components/cutscene/PageCutsceneEditor'),
          props: true,
        },
        {
          path: '/editor/interactive/:slug?',
          component: () => import(/* webpackChunkName: "editor" */ '../../ozaria/site/components/interactive/PageInteractiveEditor'),
          props: true,
        },
        {
          path: '/editor/archived-elements',
          component: () => import(/* webpackChunkName: "editor" */ '../../ozaria/site/components/archived-elements/ArchivedElementsEditor'),
          beforeEnter: (to, from, next) => {
            // TODO: Fix /editor redirect. The documentation says next('/editor') would redirect to /editor,
            // but it is not working as intended. Perhaps something to do with our use of Backbone and Vue together.
            // https://router.vuejs.org/guide/advanced/navigation-guards.html#per-route-guard
            next(me.isAdmin() ? true : '/editor')
          },
        },
        {
          path: '/funding',
          component: () => import(/* webpackChunkName: "pd" */ 'app/views/funding/FundingView.vue'),
        },
        {
          path: '/schools',
          component: () => import(/* webpackChunkName: "SchoolsView" */ 'app/views/schools/PageSchools.vue'),
        },
        {
          path: '/junior',
          component: () => import(/* webpackChunkName: "JuniorView" */ 'app/views/junior/PageJunior.vue'),
        },
        {
          path: '/school-administrator',
          component: () => {
            if (utils.isCodeCombat) {
              return import(/* webpackChunkName: "teachers" */ 'app/views/school-administrator/SchoolAdministratorComponent')
            } else {
              return import(/* webpackChunkName: "teachers" */ '../../ozaria/site/components/school-admin-dashboard/BaseSchoolAdminDashboard/index.vue')
            }
          },
          children: [
            {
              path: '',
              component: () => {
                if (utils.isCodeCombat) {
                  return import(/* webpackChunkName: "teachers" */ 'app/views/school-administrator/teachers/SchoolAdminTeacherListView')
                } else {
                  return import(/* webpackChunkName: "teachers" */ '../../ozaria/site/components/school-admin-dashboard/BaseMySchools/index.vue')
                }
              },
            },
            {
              path: 'teacher/:teacherId',
              component: () => {
                if (utils.isCodeCombat) {
                  return import(/* webpackChunkName: "teachers" */ 'app/views/school-administrator/dashboard/SchoolAdminDashboardTeacherView')
                } else {
                  return import(/* webpackChunkName: "teachers" */ '../../ozaria/site/components/school-admin-dashboard/administered-teachers/BaseTeacherAllClasses/index.vue')
                }
              },
              props: true,
            },
            { path: 'teacher/:teacherId/classes', component: () => import(/* webpackChunkName: "teachers" */ '../../ozaria/site/components/school-admin-dashboard/administered-teachers/BaseTeacherAllClasses/index.vue'), props: true },
            { path: 'teacher/:teacherId/classes/:classroomId', component: () => import(/* webpackChunkName: "teachers" */ '../../ozaria/site/components/school-admin-dashboard/administered-teachers/BaseTeacherClassProgress/index.vue'), props: true },
            { path: 'teacher/:teacherId/classes/:classroomId/projects', component: () => import(/* webpackChunkName: "teachers" */ '../../ozaria/site/components/school-admin-dashboard/administered-teachers/BaseTeacherClassProjects/index.vue'), props: true },
            { path: 'teacher/:teacherId/licenses/', component: () => import(/* webpackChunkName: "teachers" */ '../../ozaria/site/components/school-admin-dashboard/administered-teachers/BaseTeacherLicenses/index.vue'), props: true },
            { path: 'teacher/:teacherId/classroom/:classroomId', component: () => import(/* webpackChunkName: "teachers" */ 'app/views/courses/TeacherClassViewV2.vue') },
            { path: 'teacher/:teacherId/classroom/:classroomId/:studentId', component: () => import(/* webpackChunkName: "teachers" */ 'app/views/teachers/classes/TeacherStudentView.vue') },
            { path: 'licenses', component: () => import(/* webpackChunkName: "teachers" */ '../../ozaria/site/components/school-admin-dashboard/BaseSchoolAdminLicenses/index.vue') },
            { path: 'licenses/stats', component: () => import(/* webpackChunkName: 'LicenseStats' */ 'app/views/school-administrator/dashboard/LicenseTableView.vue') },
          ],
        },
        {
          path: '/api-dashboard',
          component: () => import(/* webpackChunkName: "apiViews" */ 'app/views/api/components/ApiDashboard'),
          props: (route) => ({ ...route.query, ...route.params }),
        },
        {
          path: '/admin/clan',
          component: () => import(/* webpackChunkName: "admin" */ 'app/views/admin/PageClanSearch'),
        },
        {
          path: '/admin/clan/:clanId',
          component: () => import(/* webpackChunkName: "admin" */ 'app/views/admin/PageClanEdit'),
        },
        {
          path: '/outcomes-report/:kind/:country?/:idOrSlug',
          component: () => import(/* webpackChunkName: "outcomesReport" */ 'app/views/outcomes-report/PageOutcomesReport'),
        },
        // Warning: In production debugging of third party iframe!
        {
          path: '/temporary-debug-timetap',
          component: () => import(/* webpackChunkName: "thirdPartyDebugging" */ 'app/components/timetap/TimeTapDebugPage'),
        },
        {
          path: '/payments/manage-billing',
          component: () => import(/* webpackChunkName: "manageBillingComponent"  */'app/views/payment/ManageBillingView'),
        },
        {
          path: '/payments/online-classes-success',
          component: () => import(/* webpackChunkName: "onlineClassesSuccessComponent" */'app/views/payment/online-class/SuccessView'),
        },
        {
          path: '/payments/home-subscriptions-success',
          component: () => import(/* webpackChunkName: "homeSubscriptionSuccessComponent" */'app/views/payment/HomeSubscriptionsSuccessView'),
          props: (route) => ({ ...route.query, ...route.params }),
        },
        {
          path: '/payments/tecmilenio-success',
          component: () => import(/* webpackChunkName: "tecmilenioSuccessComponent" */'app/views/payment/student-license/TecmilenioSuccessView'),
        },
        {
          path: '/payments/:slug',
          component: () => import(/* webpackChunkName: "paymentComponent" */'app/views/payment/PaymentComponentView'),
        },
        {
          path: '/ed-link/login-redirect',
          component: () => import(/* webpackChunkName: "edLinkRedirectView" */'app/views/user/EdLinkRedirectView'),
          props: (route) => ({ ...route.query, ...route.params }),
        },
        {
          path: '/teachers',
          component: () => {
            if (me.showChinaResourceInfo() && !me.isNewDashboardActive()) {
              return import(/* webpackChunkName: "teachers" */ 'app/components/common/PassThrough')
            }
            return import(/* webpackChunkName: "teachers" */ '../../ozaria/site/components/teacher-dashboard/BaseTeacherDashboard/index.vue')
          },
          children: [
            { path: '', component: () => import(/* webpackChunkName: "teachers" */ '../../ozaria/site/components/teacher-dashboard/BaseMyClasses/index.vue') },
            { path: 'classes', component: () => import(/* webpackChunkName: "teachers" */ '../../ozaria/site/components/teacher-dashboard/BaseMyClasses/index.vue') },
            { path: 'classes/:classroomId', component: () => import(/* webpackChunkName: "teachers" */ '../../ozaria/site/components/teacher-dashboard/BaseSingleClass/index.vue'), props: true },
            {
              path: 'hackstack-classes/:classroomId',
              component: () => import(/* webpackChunkName: "teachers" */ '../../ozaria/site/components/teacher-dashboard/BaseSingleClass/index.vue'),
              props: (route) => {
                return {
                  classroomId: route.params.classroomId,
                  defaultCourseId: utils.courseIDs.HACKSTACK,
                }
              },
            },
            { path: 'projects/:classroomId', component: () => import(/* webpackChunkName: "teachers" */ '../../ozaria/site/components/teacher-dashboard/BaseStudentProjects/index.vue'), props: true },
            { path: 'assessments/:classroomId', component: () => import(/* webpackChunkName: "teachers" */ '../../ozaria/site/components/teacher-dashboard/BaseStudentAssessments/index.vue'), props: true },
            { path: 'ai-junior/:classroomId', component: () => import(/* webpackChunkName: "teachers" */ '../../ozaria/site/components/teacher-dashboard/BaseAIJunior/index.vue'), props: true },
            {
              path: 'licenses/join',
              component: () => import(/* webpackChunkName: "teachers" */'app/views/teachers/JoinLicensesByCode.vue'),
            },
            {
              path: 'licenses',
              component: () => {
                if (me.showChinaResourceInfo() && !me.isNewDashboardActive()) {
                  return import(/* webpackChunkName: "paymentStudentLicenses" */'app/views/payment/v2/StudentLicensesMainComponent')
                } else {
                  return import(/* webpackChunkName: "teachers" */ '../../ozaria/site/components/teacher-dashboard/BaseTeacherLicenses/index.vue')
                }
              },
            },
            {
              path: 'resources_new',
              component: () => import(/* webpackChunkName: "teachers_new" */ 'app/views/teachers/teacher-dashboard/BaseResourceHub/index.vue'),
            },
            {
              path: 'resources',
              component: () => {
                if (me.showChinaResourceInfo() && !me.isNewDashboardActive()) {
                  return import(/* webpackChunkName: "teachers" */ 'app/views/teachers/teacher-dashboard/BaseResourceHub/index.vue')
                } else {
                  return import(/* webpackChunkName: "teachers" */ '../../ozaria/site/components/teacher-dashboard/BaseResourceHub/index.vue')
                }
              },
            },
            { path: 'professional-development', component: () => import(/* webpackChunkName: "pd" */ '../views/pd/PDViewV2.vue') },
            { path: 'curriculum', component: () => import(/* webpackChunkName: "curriculum" */ '../../ozaria/site/components/teacher-dashboard/BaseCurriculumGuide/index.vue') },
            { path: 'curriculum/:campaign', component: () => import(/* webpackChunkName: "curriculum" */ '../../ozaria/site/components/teacher-dashboard/BaseCurriculumGuide/index.vue'), props: true },
            {
              path: 'ai-league',
              component: () => import(/* webpackChunkName: "ai-league" */ '../views/ai-league/AILeagueView.vue'),
              children: [
                { path: ':idOrSlug', component: () => import(/* webpackChunkName: "LeagueViewTeachers" */ 'app/views/ai-league/PageLeagueTeachers') },
              ],
            },
            { path: 'apcsp', component: () => import(/* webpackChunkName: "apcsp" */ '../views/apcsp/PageMarketing.vue') },
            {
              path: 'guide/:product',
              component: () => import(/* webpackChunkName: "guide" */ '../../ozaria/site/components/teacher-dashboard/BaseCurriculumGuide/v2/index.vue'),
              props: true,
            },
          ],

        },
        {
          path: '/roblox',
          component: () => import(/* webpackChunkName: "RobloxView" */ 'app/views/landing-pages/roblox/NewPageRoblox'),
          meta: { theme: 'teal' },
        },
        {
          path: '/grants',
          component: () => import(/* webpackChunkName: "GrantsView" */ 'app/views/landing-pages/grants/PageGrants'),
        },
        {
          path: '/cinematicplaceholder/:levelSlug?',
          component: () => import(/* webpackChunkName: "play" */ '../../ozaria/site/components/cinematic/CinematicPlaceholder'),
          props: (route) => {
            return {
              levelSlug: route.params.levelSlug,
            }
          },
        },
        {
          path: '/sign-up/educator',
          component: () => import(/* webpackChunkName: "account" */ '../../ozaria/site/components/sign-up/PageEducatorSignup/index.vue'),
        },
        {
          path: '/professional-development',
          component: () => import(/* webpackChunkName: "pd" */ 'app/views/pd/PDViewV2.vue'),
        },
        { path: '/pd', redirect: '/professional-development' }, // TODO: doesn't actually update to /professional-development URL, just adds alias
        {
          path: '/social-and-emotional-learning',
          component: () => import(/* webpackChunkName: "sel" */ 'app/views/sel/SELView.vue'),
        },
        { path: '/sel', redirect: '/social-and-emotional-learning' }, // TODO: doesn't actually update to /social-and-emotional-learning URL, just adds alias
        {
          path: '/efficacy',
          component: () => import(/* webpackChunkName: "efficacy" */ 'app/views/efficacy/EfficacyView.vue'),
        },
        {
          path: '/libraries',
          component: () => import(/* webpackChunkName: "libraryMain" */ 'app/views/library/LibraryMainView'),
        },
        {
          path: '/library/:libraryId/login',
          component: () => import(/* webpackChunkName: "libraryLogin" */ 'app/views/library/LibraryLoginView'),
          props: (route) => ({ ...route.query, ...route.params }),
        },
        {
          path: '/podcast',
          name: 'AllPodcasts',
          component: () => import(/* webpackChunkName: "podcastMain" */'/app/views/podcast/PodcastHomeView'),
        },
        {
          path: '/podcast/:handle',
          name: 'PodcastSingle',
          component: () => import(/* webpackChunkName: "podcastSingle" */'/app/views/podcast/SinglePodcastView'),
        },
        {
          path: '/users/switch-account',
          name: 'UserSwitchAccount',
          component: () => import(/* webpackChunkName: "userSwitchAccount" */'/app/views/user/SwitchAccountView'),
        },
        {
          path: '/users/switch-account/:confirmingUserId/:requestingConfirmUserId/confirm',
          name: 'UserSwitchAccountConfirmation',
          component: () => import(/* webpackChunkName: "userSwitchAccountConfirm" */'/app/views/user/SwitchAccountConfirmationView'),
          props: (route) => ({ ...route.query, ...route.params }),
        },
        {
          path: '/parents/signup',
          name: 'ParentSignup',
          component: () => import(/* webpackChunkName: "parentDashboard" */'/app/views/parents/SignupView'),
          props: (route) => ({ ...route.query, ...route.params }),
        },
        {
          path: '/parents/book-trial-classes',
          name: 'TrialClassesScheduler',
          component: () => import(/* webpackChunkName: "parentDashboard" */'/app/views/online-class/SchedulerView'),
        },
        {
          path: '/parents/:viewName/:childId?/:product?',
          name: 'ParentDashboard',
          component: () => import(/* webpackChunkName: "parentDashboard" */'/app/views/parents/DashboardMainView'),
          props: (route) => ({ ...route.query, ...route.params }),
        },
        {
          path: '/:pname(library|partner)-dashboard',
          name: 'LibraryDashboard',
          component: () => import(/* webpackChunkName: "libraryDashboard" */'/app/views/library/dashboard/MainView'),
        },
        {
          path: '/home-beta',
          name: 'HomeBeta',
          component: () => import(/* webpackChunkName: "homeBeta" */'app/views/home/PageHome'),
        },
        {
          path: '/standards',
          name: 'StandardsPage',
          component: () => import(/* webpackChunkName: "standardsPage" */'app/views/standards/PageStandards'),
        },
        {
          path: '/home',
          name: 'HomeBeta1',
          component: () => import(/* webpackChunkName: "homeBeta" */'app/views/home/PageHome'),
        },
        {
          path: '/',
          name: 'HomeBeta2',
          component: () => import(/* webpackChunkName: "homeBeta2" */'app/views/home/PageHome'),
        },
        {
          path: '/admin/low-usage-users',
          name: 'LowUsageUsersAdmin',
          component: () => import(/* webpackChunkName: "lowUsageUsersAdmin" */'app/views/admin/low-usage-users/MainDashboardView'),
        },
        {
          path: '/exams/:examId',
          name: 'ExamPage',
          component: () => import(/* webpackChunkName: "examPage" */'app/views/exams/ExamPage'),
          props: (route) => ({ ...route.query, ...route.params }),
          children: [
            {
              path: 'start',
              name: 'ExamStartPage',
              component: () => import(/* webpackChunkName: "examPage" */'app/views/exams/StartPage'),
              props: (route) => ({ ...route.query, ...route.params }),
            },
            {
              path: 'progress',
              name: 'ExamProgressPage',
              component: () => import(/* webpackChunkName: "examPage" */'app/views/exams/ProgressPage'),
              props: true,
            },
            {
              path: 'end',
              name: 'ExamEndPage',
              component: () => import(/* webpackChunkName: "examPage" */'app/views/exams/EndPage'),
              props: true,
            },
          ],
        },
        {
          path: '/acr',
          component: () => import(/* webpackChunkName: "acr" */ 'app/views/acr/ACRView.vue'),
        },
      ],
      scrollBehavior (to) {
        const scroll = {}
        if (to.meta?.toTop) scroll.top = 0
        return scroll
      },

    })

    vueRouter.beforeEach((to, from, next) => {
      if (from.meta?.theme) {
        document.body.classList.remove(`${from.meta.theme}-theme`)
      }

      if (to.meta?.theme) {
        document.body.classList.add(`${to.meta.theme}-theme`)
      }
      next()
    })

    vueRouter.afterEach((to, from) => {
      // Fixes issue of page not scrolling to top on navigation change
      if (to.path !== from.path) {
        // If the user has navigated within the router, try and reset the scroll position.
        try {
          window.scrollTo(0, 0)
        } catch (e) {
          // Can fail silently. Handling browser compatibility
        }
      }
    })
  }

  return vueRouter
}
