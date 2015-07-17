describe("js_intro test suite", function() {

    var man;
    var student;
    var professor;

    beforeEach(function() {
        man = new Man('John Doe', '35');
        student = new Student('Mark', 34);
        professor = new Professor('Abraham', 45, 'KPI', 'PhD');
    });

    describe('Man', function() {
        describe("when new", function () {

            it('should have own "name" property and it should be string', function () {
                // regexp reference
                // ^ - search from begining of a string
                // \ {0,1} - might be a spa ce or not ({0,1} equivalent to ?)
                // [a-zA-Z]{1,} - should be one or more characters ({1,} equivalent to +)
                // [a-zA-Z]{0,} - might be a lot of characters or none of them ({0,} equivalent to *)
                // $ - end of a sttring
                // [1-9]
                expect(man.name).toMatch(/^\ {0,1}[a-zA-Z]{1,}\ {0,1}[a-zA-Z]{0,}\ {0,1}$/);
                expect(man.hasOwnProperty('name')).toBe(true);
            });

            it('should have own "age" property and it should be positive small integer number', function () {
                // positive numbers from 0 to 199
                expect(man.age).toMatch(/^[1]?[0-9]{0,2}$/);
                expect(man.hasOwnProperty('age')).toBe(true);
            });

            it('should have "live" method', function () {
                man.live();
                expect(man.live).toEqual(jasmine.any(Function));
                expect(man.live).not.toThrow();

            });

        });
    });

    describe("Student", function() {

        it('should inherit from the Man prototype', function(){
            expect(student instanceof Man).toBe(true);
            expect(student instanceof Student).toBe(true);
        });

        describe("when new", function() {

            it('should have "name" property and it should be string', function () {
                expect(student.name).toMatch(/^\ {0,1}[a-zA-Z]{1,}\ {0,1}[a-zA-Z]{0,}\ {0,1}$/);
            });

            it('should have "age" property and it should be positive small integer number', function () {
                expect(student.age).toMatch(/^[1]?[0-9]{0,2}$/);
            });

            it('should inherit "live" method', function () {
                student.live();
                expect(student.live).toEqual(jasmine.any(Function));
                expect(student.hasOwnProperty('live')).toBe(false);
                expect(student.live).not.toThrow();
            });

            it('should have "study" method', function () {
                student.study();
                expect(student.study).toEqual(jasmine.any(Function));
                expect(student.study).not.toThrow();
            });

        });
    });

    describe("Professor", function() {


        it('should inherit from the Man prototype', function(){
            expect(professor instanceof Man).toBe(true);
            expect(professor instanceof Professor).toBe(true);
        });

        describe("when new", function() {

            it('should have "name" property and it should be string', function () {
                expect(professor.name).toMatch(/^\ {0,1}[a-zA-Z]{1,}\ {0,1}[a-zA-Z]{0,}\ {0,1}$/);
            });

            it('should have "age" property and it should be positive small integer number', function () {
                expect(professor.age).toMatch(/^[1]?[0-9]{0,2}$/);
            });

            it('should have "university" property and it should be string', function () {
                expect(professor.university).toEqual(jasmine.any(String));
            });

            it('should have "degree" property and it should be string', function () {
                expect(professor.degree).toEqual(jasmine.any(String));
            });

            it('should inherit live method', function () {
                professor.live();
                expect(professor.live).toEqual(jasmine.any(Function));
                expect(professor.live).not.toThrow();
            });

            it('should have rest method', function () {
                professor.rest();
                expect(professor.rest).toEqual(jasmine.any(Function));
                expect(professor.rest).not.toThrow();
            });

            it('should have teach method', function () {
                professor.teach();
                expect(professor.teach).toEqual(jasmine.any(Function));
                expect(professor.teach).not.toThrow();
            });

            it('should have introduce method', function () {
                professor.introduce();
                expect(professor.introduce).toEqual(jasmine.any(Function));
                expect(professor.introduce).not.toThrow();
            });

        });
    });

    describe('modified Ducktype function after calling it in format: duckType.call(instance)', function(){

        it("should return the type of an instance", function(){
            expect(duckType.call(man)).toEqual('Man');
            expect(duckType.call(student)).toEqual('Student');
            expect(duckType.call(professor)).toEqual('Professor');
        });
    });
});




