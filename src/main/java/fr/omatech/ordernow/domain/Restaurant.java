package fr.omatech.ordernow.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Restaurant.
 */
@Entity
@Table(name = "restaurant")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Restaurant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "tel")
    private String tel;

    @Column(name = "email")
    private String email;

    @Column(name = "description")
    private String description;

    @OneToOne
    @JoinColumn(unique = true)
    private Address address;

    @OneToMany(mappedBy = "restaurant")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RestaurantTable> listTables = new HashSet<>();

    @OneToMany(mappedBy = "restaurant")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Menu> listMenus = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Restaurant nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getTel() {
        return tel;
    }

    public Restaurant tel(String tel) {
        this.tel = tel;
        return this;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getEmail() {
        return email;
    }

    public Restaurant email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDescription() {
        return description;
    }

    public Restaurant description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Address getAddress() {
        return address;
    }

    public Restaurant address(Address address) {
        this.address = address;
        return this;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Set<RestaurantTable> getListTables() {
        return listTables;
    }

    public Restaurant listTables(Set<RestaurantTable> restaurantTables) {
        this.listTables = restaurantTables;
        return this;
    }

    public Restaurant addListTables(RestaurantTable restaurantTable) {
        this.listTables.add(restaurantTable);
        restaurantTable.setRestaurant(this);
        return this;
    }

    public Restaurant removeListTables(RestaurantTable restaurantTable) {
        this.listTables.remove(restaurantTable);
        restaurantTable.setRestaurant(null);
        return this;
    }

    public void setListTables(Set<RestaurantTable> restaurantTables) {
        this.listTables = restaurantTables;
    }

    public Set<Menu> getListMenus() {
        return listMenus;
    }

    public Restaurant listMenus(Set<Menu> menus) {
        this.listMenus = menus;
        return this;
    }

    public Restaurant addListMenu(Menu menu) {
        this.listMenus.add(menu);
        menu.setRestaurant(this);
        return this;
    }

    public Restaurant removeListMenu(Menu menu) {
        this.listMenus.remove(menu);
        menu.setRestaurant(null);
        return this;
    }

    public void setListMenus(Set<Menu> menus) {
        this.listMenus = menus;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Restaurant)) {
            return false;
        }
        return id != null && id.equals(((Restaurant) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Restaurant{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", tel='" + getTel() + "'" +
            ", email='" + getEmail() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
