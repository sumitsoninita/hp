
import { User, UserRole, StudentApplication, ApplicationStatus, EvaluationNote, MeetingSchedule, StudentNotification } from '@/types';

const USERS_KEY = 'fff_users';
const APPLICATIONS_KEY = 'fff_applications';
const MEETINGS_KEY = 'fff_meetings';
const NOTIFICATIONS_KEY = 'fff_notifications';

// Check if we're in the browser
const isBrowser = typeof window !== 'undefined';

// User Functions
export const getUsers = (): User[] => {
    if (!isBrowser) return [];
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
};

export const getUserByEmail = (email: string): User | undefined => {
    return getUsers().find(user => user.email === email);
};

export const getUserById = (id: string): User | undefined => {
    return getUsers().find(user => user.id === id);
};

export const addUser = (user: Omit<User, 'id'>): User => {
    if (!isBrowser) throw new Error('Cannot add user on server side');
    const users = getUsers();
    const newUser: User = { ...user, id: `user_${Date.now()}` };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return newUser;
};


// Application Functions
export const getApplications = (): StudentApplication[] => {
    if (!isBrowser) return [];
    const applications = localStorage.getItem(APPLICATIONS_KEY);
    console.log('getApplications - Raw localStorage data:', applications);
    const parsed = applications ? JSON.parse(applications) : [];
    console.log('getApplications - Parsed applications:', parsed);
    return parsed;
};

export const getApplicationByStudentId = (studentId: string): StudentApplication | undefined => {
    return getApplications().find(app => app.studentId === studentId);
};

// Enhanced function to find application by student ID or name (for backward compatibility)
export const getApplicationByStudent = (studentId: string, studentName: string): StudentApplication | undefined => {
    if (!isBrowser) return undefined;
    
    try {
        const applications = getApplications();
        console.log('getApplicationByStudent - All applications:', applications);
        console.log('getApplicationByStudent - Looking for studentId:', studentId, 'studentName:', studentName);
        
        // First try to find by exact student ID
        let app = applications.find(app => app.studentId === studentId);
        console.log('getApplicationByStudent - Found by ID:', app);
        
        // If not found, try to find by student name (for existing applications with different IDs)
        if (!app) {
            app = applications.find(app => app.studentName === studentName);
            console.log('getApplicationByStudent - Found by name:', app);
            
            // If found by name, update the studentId to match current user
            if (app) {
                console.log('getApplicationByStudent - Updating studentId from', app.studentId, 'to', studentId);
                app.studentId = studentId;
                // Save the updated application back to localStorage
                localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
            }
        }
        
        console.log('getApplicationByStudent - Final result:', app);
        return app;
    } catch (error) {
        console.error('Error in getApplicationByStudent:', error);
        return undefined;
    }
};

export const addApplication = (application: Omit<StudentApplication, 'id' | 'status' | 'submissionDate'>): StudentApplication => {
    if (!isBrowser) throw new Error('Cannot add application on server side');
    const applications = getApplications();
    const newApplication: StudentApplication = {
        ...application,
        id: `app_${Date.now()}`,
        status: ApplicationStatus.SUBMITTED,
        submissionDate: new Date().toISOString()
    };
    applications.push(newApplication);
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
    return newApplication;
};

export const updateApplicationStatus = (applicationId: string, status: ApplicationStatus): StudentApplication | undefined => {
    if (!isBrowser) return undefined;
    const applications = getApplications();
    const appIndex = applications.findIndex(app => app.id === applicationId);
    if (appIndex !== -1) {
        applications[appIndex].status = status;
        localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
        return applications[appIndex];
    }
    return undefined;
};

export const addEvaluationNoteToApplication = (applicationId: string, note: Omit<EvaluationNote, 'id' | 'timestamp'>): StudentApplication | undefined => {
    if (!isBrowser) return undefined;
    const applications = getApplications();
    const appIndex = applications.findIndex(app => app.id === applicationId);
    if (appIndex !== -1) {
        // FIX: Explicitly type `newNote` to ensure it matches the EvaluationNote interface.
        const newNote: EvaluationNote = {
            ...note,
            id: `note_${Date.now()}`,
            timestamp: new Date().toISOString()
        };
        if (!applications[appIndex].notes) {
            applications[appIndex].notes = [];
        }
        applications[appIndex].notes?.push(newNote);
        localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
        return applications[appIndex];
    }
    return undefined;
};

export const deleteApplication = (applicationId: string): boolean => {
    if (!isBrowser) return false;
    const applications = getApplications();
    const filteredApplications = applications.filter(app => app.id !== applicationId);
    if (filteredApplications.length < applications.length) {
        localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(filteredApplications));
        return true;
    }
    return false;
};

export const clearAllData = (): void => {
    if (!isBrowser) return;
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem(APPLICATIONS_KEY);
    localStorage.removeItem(MEETINGS_KEY);
    localStorage.removeItem(NOTIFICATIONS_KEY);
    // Re-seed the basic users
    seedAdmin();
    seedStudent();
};

// Meeting Functions
export const getMeetings = (): MeetingSchedule[] => {
    if (!isBrowser) return [];
    const meetings = localStorage.getItem(MEETINGS_KEY);
    return meetings ? JSON.parse(meetings) : [];
};

export const getMeetingsByApplication = (applicationId: string): MeetingSchedule[] => {
    return getMeetings().filter(meeting => meeting.applicationId === applicationId);
};

export const getMeetingsByStudent = (studentId: string): MeetingSchedule[] => {
    return getMeetings().filter(meeting => meeting.studentId === studentId);
};

export const addMeeting = (meeting: Omit<MeetingSchedule, 'id' | 'createdAt'>): MeetingSchedule => {
    if (!isBrowser) throw new Error('Cannot add meeting on server side');
    const meetings = getMeetings();
    const newMeeting: MeetingSchedule = {
        ...meeting,
        id: `meeting_${Date.now()}`,
        createdAt: new Date().toISOString()
    };
    meetings.push(newMeeting);
    localStorage.setItem(MEETINGS_KEY, JSON.stringify(meetings));
    return newMeeting;
};

export const updateMeetingStatus = (meetingId: string, status: 'scheduled' | 'completed' | 'cancelled'): MeetingSchedule | undefined => {
    if (!isBrowser) return undefined;
    const meetings = getMeetings();
    const meetingIndex = meetings.findIndex(meeting => meeting.id === meetingId);
    if (meetingIndex !== -1) {
        meetings[meetingIndex].status = status;
        localStorage.setItem(MEETINGS_KEY, JSON.stringify(meetings));
        return meetings[meetingIndex];
    }
    return undefined;
};

// Notification Functions
export const getNotifications = (): StudentNotification[] => {
    if (!isBrowser) return [];
    const notifications = localStorage.getItem(NOTIFICATIONS_KEY);
    return notifications ? JSON.parse(notifications) : [];
};

export const getNotificationsByStudent = (studentId: string): StudentNotification[] => {
    return getNotifications().filter(notification => notification.studentId === studentId);
};

export const getUnreadNotificationsByStudent = (studentId: string): StudentNotification[] => {
    return getNotificationsByStudent(studentId).filter(notification => !notification.isRead);
};

export const addNotification = (notification: Omit<StudentNotification, 'id' | 'createdAt'>): StudentNotification => {
    if (!isBrowser) throw new Error('Cannot add notification on server side');
    const notifications = getNotifications();
    const newNotification: StudentNotification = {
        ...notification,
        id: `notification_${Date.now()}`,
        createdAt: new Date().toISOString()
    };
    notifications.push(newNotification);
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
    return newNotification;
};

export const markNotificationAsRead = (notificationId: string): StudentNotification | undefined => {
    if (!isBrowser) return undefined;
    const notifications = getNotifications();
    const notificationIndex = notifications.findIndex(notification => notification.id === notificationId);
    if (notificationIndex !== -1) {
        notifications[notificationIndex].isRead = true;
        localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
        return notifications[notificationIndex];
    }
    return undefined;
};

export const markAllNotificationsAsRead = (studentId: string): void => {
    if (!isBrowser) return;
    const notifications = getNotifications();
    notifications.forEach(notification => {
        if (notification.studentId === studentId && !notification.isRead) {
            notification.isRead = true;
        }
    });
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
};

// Migration function to fix existing applications with mismatched student IDs
export const migrateApplicationStudentIds = (): void => {
    if (!isBrowser) return;
    
    try {
        const applications = getApplications();
        const users = getUsers();
        let updated = false;
        
        applications.forEach(app => {
            // Check if the studentId in the application matches any existing user
            const userExists = users.find(user => user.id === app.studentId);
            
            if (!userExists) {
                // Try to find user by name
                const userByName = users.find(user => user.fullName === app.studentName);
                if (userByName) {
                    app.studentId = userByName.id;
                    updated = true;
                }
            }
        });
        
        if (updated) {
            localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
        }
    } catch (error) {
        console.error('Error in migration:', error);
    }
};

// Seeding functions (defined after main functions to avoid circular dependency)
const seedAdmin = () => {
    if (!isBrowser) return;
    
    const users = getUsers();
    if (!users.some(u => u.role === UserRole.ADMIN)) {
        const admin: User = {
            id: 'admin_01',
            email: 'admin@test.com',
            password: 'admin123',
            role: UserRole.ADMIN,
            fullName: 'HP Admin'
        };
        users.push(admin);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
};

const seedStudent = () => {
    if (!isBrowser) return;
    
    const users = getUsers();
    if (!users.some(u => u.email === 'student@test.com')) {
        const student: User = {
            id: 'student_01',
            email: 'student@test.com',
            password: 'student123',
            role: UserRole.STUDENT,
            fullName: 'Test Student',
            college: 'Test University'
        };
        users.push(student);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
};

// Initialize with admin and student (only in browser)
if (isBrowser) {
    try {
        if (!localStorage.getItem(USERS_KEY)) {
            localStorage.setItem(USERS_KEY, JSON.stringify([]));
            seedAdmin();
            seedStudent();
        } else {
            // Ensure both users exist even if localStorage already has data
            seedAdmin();
            seedStudent();
            // Run migration to fix any existing application student ID mismatches
            // Temporarily disabled to fix loading issue
            // try {
            //     migrateApplicationStudentIds();
            // } catch (error) {
            //     console.error('Migration failed:', error);
            // }
        }
    } catch (error) {
        console.error('Storage service initialization failed:', error);
    }
}