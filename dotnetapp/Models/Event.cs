namespace dotnetapp.Models{
    public class Event{
        public int EventId{get;set;}
        public string Title{get;set;}
        public string Description{get;set;}
        public string Location{get;set;}
        public DateTime Date{get;set;}
        public string OrganizerName{get;set;}
        public string ContactInfo{get;set;}
        public DateTime PostedDate{get;set;}
        public string Status{get;set;}
    }
}